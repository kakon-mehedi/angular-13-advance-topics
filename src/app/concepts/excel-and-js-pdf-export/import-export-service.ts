import { ElementRef, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { BehaviorSubject, take } from 'rxjs';
import { WorkSheet } from 'xlsx';
import * as XLSX from 'xlsx-js-style';
import { font } from '../assets/fonts/fontBase64';
import { ewopharmaLogo } from '../assets/images/logoBase64';

export interface ICommonRowStyle {
	fill?: {
		patternType?: string;
		fgColor: {
			rgb: string;
		};

		bgColor: {
			rgb: string;
		};
	};

	font?: {
		name?: string;
		color?: {
			rgb: string;
		};
		bold?: boolean;
		sz?: number;
	};

	alignment?: {
		horizontal?: string;
		vertical?: string;
		wrapText?: boolean;
	};
}

export interface IReportInfo {
	title: string;
	filterName: string;
	planningScenario: string;
	planningPeriod?: string;
	regions: string;
	departments?: string;
	partners?: string;
	products?: string;
}

export interface IExcelReportInfo {
	title: Array<string>;
	type: Array<string>;
	filters: Array<string>;
}
@Injectable({
	providedIn: 'root',
})
export class ImportExportService {
	tableDomRef: ElementRef;
	currentTableDomRef: any = new BehaviorSubject(null);
	currentFiltersApplied: BehaviorSubject<IReportInfo> = new BehaviorSubject(null);
	fileName: string;
	classToTarget: string;

	exportOptions = {
		EXCEL: 'excel',
		PDF: 'pdf',
	};

	currentlyExporting: string = '';

	stringsToRemoveList = ['remove_circle_outline', 'add_circle_outline'];
	projectDefaultInfoA2A: Array<Array<string>> = [[]];

	pdfReportInfo: IReportInfo;

	DEFAULT_SPACE = '~~~~~~~~';

	colors = {
		PRIMARY: '0c343d',
		SECONDARY: '134f5c',
		HEADERS: '45818e',
		DANGER: 'FF0000',
		BLACK: '000000',
		WHITE: 'FFFFFF',
		FONT_COLOR_DEFAULT: '002d71',
	};

	fontSizes = {
		TITLE: 28,
		SUB_TITLE: 20,
		TEXT: 12,
	};

	PDF_FONT_FAMILY = 'Roboto';

	globalStyle: ICommonRowStyle = {
		font: {
			name: 'Calibri',
			color: { rgb: this.colors.WHITE },
			sz: this.fontSizes.TEXT,
		},

		alignment: {
			vertical: 'center',
			horizontal: 'center',
			wrapText: false,
		},
	};

	constructor() {}

	getRowStyle(options: ICommonRowStyle): ICommonRowStyle {
		if (options.fill?.bgColor || options.fill?.fgColor) {
			return {
				fill: {
					fgColor: options.fill?.fgColor,
					bgColor: options.fill?.bgColor,
				},

				font: {
					name: options.font.name ? options.font.name : 'Calibri',
					color: options.font?.color ? options.font.color : { rgb: this.colors.WHITE },
					bold: options.font?.bold ? options.font.bold : false,
					sz: options.font?.sz ? options.font.sz : 12,
				},

				alignment: {
					horizontal: options.alignment?.horizontal ? options.alignment.horizontal : 'center',
					vertical: options.alignment?.horizontal ? options.alignment.horizontal : 'center',
					wrapText: options.alignment?.wrapText ? options.alignment.wrapText : false,
				},
			};
		} else {
			return {
				font: {
					name: options.font.name ? options.font.name : 'Calibri',
					color: options.font?.color ? options.font.color : { rgb: this.colors.WHITE },
					bold: options.font?.bold ? options.font.bold : false,
					sz: options.font?.sz ? options.font.sz : 12,
				},

				alignment: {
					horizontal: options.alignment?.horizontal ? options.alignment.horizontal : 'center',
					vertical: options.alignment?.horizontal ? options.alignment.horizontal : 'center',
					wrapText: options.alignment?.wrapText ? options.alignment.wrapText : true,
				},
			};
		}
	}

	exportToPdf(classToTarget = 'row-padding') {
		this.currentlyExporting = this.exportOptions.PDF;
		this.classToTarget = classToTarget;
		this.subscribeReportInfo();
	}

	exportToExcel(classToTarget = 'row-padding') {
		this.currentlyExporting = this.exportOptions.EXCEL;
		this.classToTarget = classToTarget;
		this.subscribeReportInfo();
	}

	subscribeReportInfo() {
		this.currentFiltersApplied.pipe(take(1)).subscribe((res: IReportInfo) => {
			const allFilters = `${res.planningScenario ? res.planningScenario : ''} | ${
				res.planningPeriod ? res.planningPeriod : null
			} | ${res.regions} | ${res.departments ? res.departments : null} | ${res.partners ? res.partners : null} | ${
				res.departments ? res.departments : null
			}`;

			this.projectDefaultInfoA2A = [[res.title], [res.filterName], [allFilters]];

			this.pdfReportInfo = {
				title: String(res.title),
				filterName: String(res.filterName),
				planningScenario: res.planningScenario ? String(res.planningScenario) : null,
				regions: String(res.regions),
				planningPeriod: res.planningPeriod ? String(res.planningPeriod) : null,
				departments: res.departments ? String(res.departments) : null,
				partners: res.partners ? String(res.partners) : null,
				products: res.products ? String(res.products) : null,
			};

			this.fileName = String(res.filterName);
			this.subscribeTableRefAndExport();
		});
	}

	subscribeTableRefAndExport() {
		this.currentTableDomRef.pipe(take(1)).subscribe((res) => {
			if (res) {
				if (this.currentlyExporting === this.exportOptions.EXCEL) {
					this.runExcelExport(res);
				}

				if (this.currentlyExporting === this.exportOptions.PDF) {
					this.runPdfExport(res);
				}
			} else {
				return;
			}
		});
	}

	runExcelExport(tableDomRef: ElementRef) {
		/* Creating Empty worksheet */
		let ws: WorkSheet = XLSX.utils.json_to_sheet([]);

		/* Adding Project Headers */
		ws = XLSX.utils.sheet_add_aoa(ws, this.projectDefaultInfoA2A);

		/* Merging Project Headers and make them center align */
		this.mergeCells(ws);

		/* Setting Custom Row Column Width */
		this.setRowColumnHeightWidth(ws);

		/* Creating row gap after Headers */
		const numberOfRowGap = 3;
		this.createGapRows(ws, numberOfRowGap);

		/* Find Table */
		let table: HTMLTableElement = tableDomRef.nativeElement.querySelector('table');

		const tableCopy = table.cloneNode(true);
		this.customizeTable(tableCopy, this.classToTarget);

		/* Adding HTML Table ref to the worksheet */
		ws = XLSX.utils.sheet_add_dom(ws, tableCopy, { origin: -1, raw: true });

		const totalRows = this.getTotalNumberOfRows(ws);

		let dustKeyList: Array<string> = [];

		/* Adding font styles and colors into different rows */
		for (let i in ws) {
			let isRemoveTextExist = false;
			const currentCellText: string = ws[i].v;

			if (currentCellText) {
				isRemoveTextExist = this.stringsToRemoveList.some((item: string) => String(currentCellText).includes(item));
			}

			if (isRemoveTextExist) {
				dustKeyList.push(i);
			}

			if (typeof ws[i] != 'object') continue;
			let cell = XLSX.utils.decode_cell(i);
			const currentRowNumber = cell.r;

			/* Global Style */
			ws[i].s = this.globalStyle;

			/* First Row Style */
			if (cell.r == 0) {
				const rowStyle = this.getRowStyle({
					font: {
						sz: this.fontSizes.TITLE,
						bold: true,
					},

					fill: {
						fgColor: {
							rgb: this.colors.PRIMARY,
						},

						bgColor: {
							rgb: this.colors.PRIMARY,
						},
					},
				});

				ws[i].s = rowStyle;
			}

			/* Second Row Style */
			if (cell.r == 1) {
				const rowStyle = this.getRowStyle({
					font: {
						sz: this.fontSizes.SUB_TITLE,
						bold: true,
					},

					fill: {
						fgColor: {
							rgb: this.colors.PRIMARY,
						},

						bgColor: {
							rgb: this.colors.PRIMARY,
						},
					},
				});

				ws[i].s = rowStyle;
			}

			/* Third Row Style */
			if (cell.r == 2) {
				const rowStyle = this.getRowStyle({
					font: {
						sz: this.fontSizes.TEXT,
						bold: true,
					},

					fill: {
						fgColor: {
							rgb: this.colors.PRIMARY,
						},

						bgColor: {
							rgb: this.colors.PRIMARY,
						},
					},

					alignment: {
						wrapText: true,
					},
				});

				ws[i].s = rowStyle;
			}

			/* Sixth Row Style */
			if (cell.r == 5) {
				const rowStyle = this.getRowStyle({
					font: {
						sz: this.fontSizes.TEXT,
						bold: true,
					},

					fill: {
						fgColor: {
							rgb: this.colors.PRIMARY,
						},

						bgColor: {
							rgb: this.colors.PRIMARY,
						},
					},
				});

				ws[i].s = rowStyle;
			}

			/* Seventh Row Style */
			if (cell.r == 6) {
				const rowStyle = this.getRowStyle({
					font: {
						sz: this.fontSizes.TEXT,
						bold: true,
					},

					fill: {
						fgColor: {
							rgb: this.colors.SECONDARY,
						},

						bgColor: {
							rgb: this.colors.SECONDARY,
						},
					},
				});

				ws[i].s = rowStyle;
			}

			/* Eighth Row Style */
			if (cell.r == 7) {
				const rowStyle = this.getRowStyle({
					font: {
						sz: this.fontSizes.TEXT,
						bold: true,
					},

					fill: {
						fgColor: {
							rgb: this.colors.HEADERS,
						},

						bgColor: {
							rgb: this.colors.HEADERS,
						},
					},
				});

				ws[i].s = rowStyle;
			}
		}

		ws = this.modifiedObj(ws, dustKeyList);
		this.customizeFontColor(ws);
		this.makeFirstCoulmLeftAlign(ws, totalRows);
		this.exportAsExcel(ws);
	}

	exportAsExcel(worksheet: WorkSheet) {
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
		XLSX.writeFile(wb, `${this.fileName}.xlsx`);
	}

	createGapRows(ws: WorkSheet, numberOfRows: number) {
		/*  get original range */
		let ref = XLSX.utils.decode_range(ws['!ref']);

		/* add to ending row */
		ref.e.r += numberOfRows;

		ws['!ref'] = XLSX.utils.encode_range(ref);
	}

	setRowColumnHeightWidth(worksheet: WorkSheet) {
		worksheet['!rows'] = [
			{ hpt: 36 }, // height for row 1
			{ hpt: 30 }, //height for row 2
			{ hpt: 30 }, //height for row 3
			{ hpt: 10 }, //height for row 4
			{ hpt: 10 }, //height for row 5
			{ hpt: 10 }, //height for row 6
			{ hpt: 20 }, //height for row 7
			{ hpt: 20 }, //height for row 8
		];

		worksheet['!cols'] = [
			{ wch: 60 }, // Making first column 60 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
			{ wch: 20 }, // Making the next column 20 character long
		];
	}

	mergeCells(worksheet: WorkSheet) {
		const firstRow10Col = {
			s: { r: 0, c: 0 },
			e: { r: 0, c: 12 },
		};

		const secondRow10Col = {
			s: { r: 1, c: 0 },
			e: { r: 1, c: 12 },
		};

		const thirdRow10Col = {
			s: { r: 2, c: 0 },
			e: { r: 2, c: 12 },
		};

		const fourFiveBlankRow10Col = {
			s: { r: 3, c: 0 },
			e: { r: 4, c: 12 },
		};

		const sixthRow10Col = {
			s: { r: 5, c: 0 },
			e: { r: 5, c: 12 },
		};

		worksheet['!merges'] = [firstRow10Col, secondRow10Col, thirdRow10Col, fourFiveBlankRow10Col, sixthRow10Col];
	}

	modifiedObj(ws: any, dustKeyList) {
		for (let key of dustKeyList) {
			let currentString = ws[key].v;

			for (let str of this.stringsToRemoveList) {
				currentString = String(currentString).replace(str, '');
				ws[key].v = currentString;
			}
		}
		return ws;
	}

	getTotalNumberOfRows(worksheet: WorkSheet) {
		const range = XLSX.utils.decode_range(worksheet['!ref']);
		const numOfRows = range.e.r - range.s.r + 1;

		return numOfRows;
	}

	makeFirstCoulmLeftAlign(worksheet: WorkSheet, totalRows: number): void {
		const leftAlignStyle: ICommonRowStyle = {
			alignment: {
				horizontal: 'left',
			},

			font: {
				sz: 12,
				color: {
					rgb: this.colors.BLACK,
				},
			},
		};

		for (let i = 9; i <= totalRows; i++) {
			const key = `A${i}`;

			if (worksheet[key]?.s) {
				worksheet[key].s = leftAlignStyle;
			}

			if (worksheet[key]?.v) {
				worksheet[key].v = this.replaceTildesWithSpace(worksheet[key].v);
			}
		}
	}

	addNestedString(row: number, target: number) {}

	customizeTable(table: any, targetCls: string) {
		let rowList: HTMLCollection = table.rows;

		for (let index in rowList) {
			let row: Element = rowList[index];
			let firstItemOfTheRow: Element = row.children ? row.children[0] : null;

			if (firstItemOfTheRow) {
				let elementValue = firstItemOfTheRow.textContent;
				const classList: DOMTokenList = firstItemOfTheRow.classList;
				const className: string = classList.value;
				const isNestedChildExist: boolean = className.includes(targetCls);

				if (isNestedChildExist) {
					const wordList: Array<string> = className.split(' ');
					let classContainsSpaceInfo = wordList.filter((w) => w.includes(targetCls));
					let targetClass: string = classContainsSpaceInfo[0];

					let spaceLength = this.extractNumberFromString(targetClass);

					if (targetCls.includes('pl')) {
						spaceLength = this.extractNumberFromPadding(targetClass);
					}

					if (spaceLength >= 1) {
						this.modifyElementValue(row, elementValue, spaceLength);
					}
				}
			}
		}
	}

	extractNumberFromPadding(str: string) {
		let match = str.match(/\d+/);
		let number = 0;

		if (match) {
			number = parseInt(match[0]);
		}

		return number / 48;
	}

	extractNumberFromString(str: string): number {
		const strList = str.split('');
		return +strList.pop();
	}

	modifyElementValue(row, val, spaceLength) {
		for (let removeStr of this.stringsToRemoveList) {
			if (val.includes(removeStr)) {
				val = String(val).replace(removeStr, '');
			}
		}

		val = val.trim();

		for (let i = 0; i < spaceLength; i++) {
			val = this.DEFAULT_SPACE + val;
		}

		row.children[0].textContent = val;
	}

	replaceTildesWithSpace(inputString: string) {
		let inputArr = inputString.split('~');

		const newArr = inputArr.map((item) => {
			if (item === '') {
				return ' ';
			} else {
				return item;
			}
		});

		const newString = newArr.join('');

		return newString;
	}

	customizeFontColor(ws: WorkSheet) {
		for (let i in ws) {
			let cell = XLSX.utils.decode_cell(i);
			const currentCellText: string = ws[i].v;
			const currentRowNumber = cell.r;

			if (currentRowNumber > 7) {
				const option: ICommonRowStyle = {
					font: {
						color: {
							rgb: this.colors.SECONDARY,
						},
					},
				};

				const fontColorAccent: ICommonRowStyle = this.getRowStyle(option);

				ws[i].s = fontColorAccent;

				/* Font color Red for Negative number */
				if (!this.isPositiveNumber(currentCellText)) {
					const option = {
						font: {
							color: {
								rgb: this.colors.DANGER,
							},
						},
					};

					const fontColorRed: ICommonRowStyle = this.getRowStyle(option);
					ws[i].s = fontColorRed;
				}
			}
		}
	}

	isPositiveNumber(value: string): boolean {
		const number = this.convertStringToNumber(value);

		if (isNaN(number) || number >= 0) {
			return true;
		}

		return false;
	}

	convertStringToNumber(inputString: string) {
		inputString = String(inputString);
		/* Remove all non-digit characters (including commas) except the decimal point and minus sign */
		const numericString = inputString.replace(/[^\d.-]/g, '');

		/* Parse the numeric string as a number */
		const numericValue = parseFloat(numericString);

		return numericValue;
	}

	runPdfExport(tableDomRef: ElementRef) {
		/* Targetting DOM table to get maxWidth of the table via ScrollWidth */
		const mainTable = tableDomRef.nativeElement.querySelector('table');
		const scrollWidth = mainTable.scrollWidth;

		/* Find Table */
		let table: HTMLTableElement = tableDomRef.nativeElement.querySelector('table');

		const tableCopy = table.cloneNode(true);
		this.customizeTableForPdfExport(tableCopy);

		const tableContainer: HTMLElement = document.createElement('div');
		tableContainer.appendChild(tableCopy);
		const table2 = tableContainer.querySelector('table');

		const finalElement = this.generatePdfHeader();

		finalElement.appendChild(table2);

		/* DOM ELEMET EXPORT */
		let doc: jsPDF = new jsPDF({
			orientation: 'landscape',
		});

		this.setFont(doc);

		/* Warning!!! This pageWidth value should be changed */
		const potraitWidth = 200;
		const landscapeWidth = 290;
		const pageWidth = landscapeWidth;
		const fileName = `${this.fileName}.pdf`;

		doc.html(finalElement, {
			callback: function (doc) {
				doc.save(fileName);
			},
			x: 5,
			y: 5,
			width: pageWidth,
			windowWidth: scrollWidth,
		});
	}

	customizeTableForPdfExport(table: any): void {
		let rowList: HTMLCollection = table.rows;

		for (let key in rowList) {
			if (key === 'length') continue;
			let row: Element = rowList[key];

			if (row.children?.length > 0) {
				let tableDataList = row.children;

				for (let key in tableDataList) {
					if (key === 'length') continue;
					let td: Element = tableDataList[key];
					const text = td.textContent;
					if (text) {
						td.textContent = this.removeUnwantedText(td.textContent);
					}
				}
			}
		}
	}

	removeUnwantedText(text: string): string {
		if (!text) return;

		for (let targetText of this.stringsToRemoveList) {
			if (text.includes(targetText)) {
				text = String(text).replace(targetText, '');
			}
		}

		return text;
	}

	generatePdfHeader() {
		const REPORT_INFO = this.pdfReportInfo;

		const COLORS = {
			primary: '#0c343d',
			accent: '#e0ecef',
		};

		const headerStyle = {
			background: COLORS.primary,
			color: 'white',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			fontSize: '12px',
			padding: '24px',
		};

		const logo = ewopharmaLogo;

		/* Genering all the required divs */
		const header = document.createElement('div');

		/* Titles Section */
		const titleSection = document.createElement('div');

		const titleSectionStyle = {
			letterSpacing: '2px',
		};

		Object.assign(titleSection.style, titleSectionStyle);

		const title = this.generateElement('h2', REPORT_INFO.title);
		const filterName = this.generateElement('h2', REPORT_INFO.filterName);
		let planningYear;

		if (REPORT_INFO.planningPeriod) {
			planningYear = this.generateElement(
				'h2',
				`Planning Scenario: ${REPORT_INFO.planningScenario} | Planning Period: ${REPORT_INFO.planningPeriod}`
			);
		} else {
			planningYear = this.generateElement('h2', `Planning Scenario: ${REPORT_INFO.planningScenario}`);
		}

		/* Logo section */
		const imageStyle = {
			width: '190px',
		};

		const image = document.createElement('img');
		image.setAttribute('src', logo);

		/* Filter list Section */
		const filterCommonStyle = {
			padding: '5px 24px',
			background: COLORS.accent,
			letterSpacing: '2px',
		};

		const filtersDiv = document.createElement('div');
		const divider1 = document.createElement('hr');
		const divider2 = document.createElement('hr');
		const divider3 = document.createElement('hr');
		const lineBreak = document.createElement('br');

		let regions;
		let departments;
		let partners;
		let products;

		if (REPORT_INFO.regions) {
			regions = this.generateElement('p', `Countries: ${REPORT_INFO.regions}`);
			Object.assign(regions.style, filterCommonStyle);
			filtersDiv.appendChild(regions);
			filtersDiv.appendChild(divider1);
		}

		if (REPORT_INFO.departments) {
			departments = this.generateElement('p', `Departments: ${REPORT_INFO.departments}`);
			Object.assign(departments.style, filterCommonStyle);
			filtersDiv.appendChild(departments);
			filtersDiv.appendChild(divider2);
		}

		if (REPORT_INFO.partners) {
			partners = this.generateElement('p', `Partners: ${REPORT_INFO.partners}`);
			Object.assign(partners.style, filterCommonStyle);
			filtersDiv.appendChild(partners);
			filtersDiv.appendChild(divider3);
		}

		if (REPORT_INFO.products) {
			products = this.generateElement('p', `Products: ${REPORT_INFO.products}`);
			Object.assign(products.style, filterCommonStyle);
			filtersDiv.appendChild(products);
			filtersDiv.appendChild(lineBreak);
		}

		/* Assigning styles to the Elements */

		Object.assign(header.style, headerStyle);
		Object.assign(image.style, imageStyle);

		/* Appending Childs */
		titleSection.appendChild(title);
		titleSection.appendChild(filterName);
		titleSection.appendChild(planningYear);

		header.appendChild(titleSection);
		header.appendChild(image);

		const mainDiv = document.createElement('div');
		mainDiv.appendChild(header);
		mainDiv.appendChild(filtersDiv);

		const fontStye = {
			fontFamily: this.PDF_FONT_FAMILY,
			letterSpacing: '1px',
		};

		Object.assign(mainDiv.style, fontStye);

		return mainDiv;
	}

	generateElement(type, text) {
		const element = document.createElement(type);

		if (text) {
			element.textContent = text;
		}

		return element;
	}

	setFont(doc: jsPDF) {
		doc.addFileToVFS(`${this.PDF_FONT_FAMILY}.ttf`, font);
		doc.addFont(`${this.PDF_FONT_FAMILY}.ttf`, this.PDF_FONT_FAMILY, 'normal');
		doc.setFont(this.PDF_FONT_FAMILY);
	}
}
