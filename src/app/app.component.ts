import { Component } from '@angular/core';
import { NotificationService } from './notification-service';
import { HttpClient } from '@angular/common/http';
import { INotificationContent } from './notification.types';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'fresh-angular-13';

	notifications: INotificationContent[] = [];

	constructor(private _notificationService: NotificationService) {}

	ngOnInit(): void {
		this._notificationService.startConnection();
		
    this._notificationService.listenForNotifications((message: INotificationContent) => {
			this.notifications.push(message);
		});
	}

	sendTestNotification(): void {
		this._notificationService
			.sendNotification({
				title: 'Title Demo',
				message: 'Notification Sent',
			})
			.subscribe({
				next: (response: INotificationContent) => console.log('Success:', response),
				error: (error) => console.error('Error:', error),
			});
	}
}
