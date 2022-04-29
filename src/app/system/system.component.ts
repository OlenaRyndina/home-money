import { Component, HostBinding } from '@angular/core';
import { fadeStateTrigger } from '../shared/animations/fade.animation';

@Component({
	selector: 'hm-system',
	templateUrl: './system.component.html',
	styleUrls: ['./system.component.less'],
	animations: [fadeStateTrigger]
})

export class SystemComponent {
	@HostBinding('@fade') a = true;
}