import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { INotificationContent } from './notification.types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	private hubConnection!: signalR.HubConnection;

	headers: HttpHeaders = new HttpHeaders({
		'Content-Type': 'application/json',
	});

	notificationHubUrl = 'http://localhost:5129/notificationHubKakon';
	notificationBaseUrl =
		'http://localhost:5129/api/Notification/SendNotification';

	constructor(private _http: HttpClient) {}

	startConnection(): void {
		this.hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(this.notificationHubUrl)
			.build();

		this.hubConnection
			.start()
			.then(() => console.log('Connection started'))
			.catch((err) =>
				console.log('Error while starting connection: ' + err)
			);
	}

	listenForNotifications(callback: (message: INotificationContent) => void): void {
		this.hubConnection.on('ReceiveNotification', (message: INotificationContent) => {
			callback(message);
		});
	}

	sendNotification(payload: INotificationContent): Observable<INotificationContent> {
		return this._http.post<INotificationContent>(this.notificationBaseUrl, payload, {
			headers: this.headers,
		});
	}
}
