import { InjectionToken } from '@angular/core';
import { Iwidget } from '../models/Iwidget';

export const WIDGET_TOKEN = new InjectionToken<Iwidget>('myWidgetToken');
