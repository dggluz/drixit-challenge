class Observer {
	constructor (private _eventName: string, private _callback: (y: any) => void) {}

	notify (eventName: string, value: unknown) {
		if (this._eventName === eventName) {
			this._callback(value);
		}
		return this;
	}
}

export class Observable <T extends { [key: string]: unknown }> {
	private _observers: Observer[] = [];

	subscribe <K extends keyof T & string> (eventName: K, callback: (x: T[K]) => void) {
		this._observers.push(new Observer(eventName, callback));
		return this;
	}

	protected _notifyObservers <K extends keyof T & string> (event: K, value: T[K]) {
		this._observers.forEach(anObserver => anObserver.notify(event, value));
		return this;
	}
}
