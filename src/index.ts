const domReady = require('domready')

type SmartsuppWindow = Window & {
	SMARTSUPP_LOADED?: boolean
	SMARTSUPP_AUTOCREATE?: boolean
	smartsupp?: any
	_smartsupp?: WidgetOptions & { key: string }
}

export interface WidgetOptions {
	zIndex?: number
	cookiePath?: string
	cookieDomain?: string
	hideWidget?: boolean
	hideMobileWidget?: boolean
	hideOfflineChat?: boolean
	requireLogin?: boolean
	privacyNoticeEnabled?: boolean
	privacyNoticeUrl?: string
	privacyNoticeCheckRequired?: boolean
	orientation?: 'left' | 'right'
	offsetX?: number
	offsetY?: number
	color?: string
	ratingEnabled?: boolean
	gaName?: string
	gaKey?: string
	gaOptions?: any
	_loaderUrl?: string
}

const win = window as SmartsuppWindow

export function init(key: string, options: WidgetOptions = {}): void {
	if (win.smartsupp) {
		throw new Error('Smartsupp client is already initialized.')
	}

	win._smartsupp = {
		...(win._smartsupp || {}),
		...(options || {}),
		key,
	}
	win.smartsupp = function() { win.smartsupp._.push(arguments) }
	win.smartsupp._ = []

	domReady(() => {
		const script = window.document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.charset = 'utf-8'
		script.src = options._loaderUrl || 'https://www.smartsuppchat.com/loader.js'
		document.body.appendChild(script)
	})
}

export function setLanguage(lang: string) {
	callApiMethod('language', lang)
}

export function setName(name: string): void {
	callApiMethod('name', name)
}

export function setEmail(email: string): void {
	callApiMethod('email', email)
}

export function setGroup(group: string): void {
	callApiMethod('group', group)
}

export function setPhone(phone: string): void {
	callApiMethod('phone', phone)
}

export function setVariables(variables: Record<string, string | boolean | number>): void {
	callApiMethod('variables', variables)
}

export function chatShow(): void {
	callApiMethod('chat:show')
}

export function chatHide(): void {
	callApiMethod('chat:hide')
}

export function chatOpen(): void {
	callApiMethod('chat:open')
}

export function chatClose(): void {
	callApiMethod('chat:close')
}

export function chatMessage(text: string): void {
	callApiMethod('chat:message', text)
}

function callApiMethod(name: string, ...args: any[]): void {
	if (!win.smartsupp) {
		throw new Error('Smartsupp client was not initialized')
	}
	win.smartsupp(name, ...args)
}
