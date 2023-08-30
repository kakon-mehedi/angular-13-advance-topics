import { LoggerService } from 'src/app/logger.service';

import { Component, Inject, OnInit } from '@angular/core';
import { ExperimentLoggerService } from 'src/app/experiment-logger.service';
import {
	LOGIN_TOKEN,
	Login,
	OPERATION_STATUS,
	USER_TOKEN,
	User,
	users,
} from 'src/app/users';

@Component({
	selector: 'app-dependency-providers',
	templateUrl: './dependency-providers.component.html',
	styleUrls: ['./dependency-providers.component.scss'],
	providers: [
		{
			provide: LoggerService,
			useClass: LoggerService,
		},

		{
			provide: LoggerService,
			useClass: ExperimentLoggerService,
		},

		{
			provide: 'UserList',
			useValue: users,
		},

		{
			provide: 'OperationEnums',
			useValue: OPERATION_STATUS,
		},

		{
			provide: 'UserRoleList',
			useValue: ['admin', 'modarator', 'editor'],
		},

		{
			provide: 'UserRegion',
			useValue: { name: 'kakon', region: 'Bangladesh' },
		},

		{
			provide: 'LOGIN_TOKEN_BY_KAKON',
			useValue: LOGIN_TOKEN,
		},

		{
			provide: 'USER_TOKEN_BY_KAKON',
			useValue: USER_TOKEN,
		},
	],
})
export class DependencyProvidersComponent implements OnInit {
	constructor(
		private kakon: LoggerService,
		@Inject('UserList') user: User,
		@Inject('OperationEnums') operationStatus: any,
		@Inject('UserRoleList') roleList: any,
		@Inject('UserRegion') regionInfo: any,
		@Inject('LOGIN_TOKEN_BY_KAKON') LOGIN_TOKEN: Login,
		@Inject('USER_TOKEN_BY_KAKON') USER_TOKEN: any
	) {
		console.log(kakon);
		console.log(user);
		console.log(operationStatus);
		console.log(roleList);
		console.log(regionInfo);
		console.log(LOGIN_TOKEN);
		console.log(LOGIN_TOKEN.email);
		console.log(LOGIN_TOKEN.password);
		console.log(USER_TOKEN);
		console.log(USER_TOKEN._desc);
	}

	ngOnInit(): void {
		//console.log(this.kakon);
	}
}
