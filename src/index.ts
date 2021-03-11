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
}

const win = window as SmartsuppWindow

export class SmartsuppSdk {
	init(key: string, options?: WidgetOptions): void {
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
			script.src = 'https://www.smartsuppchat.com/loader.js'
			document.body.appendChild(script)
		})
	}

	setLanguage(lang: string) {
		callApiMethod('language', lang)
	}

	setName(name: string): void {
		callApiMethod('name', name)
	}

	setEmail(email: string): void {
		callApiMethod('email', email)
	}

	setGroup(group: string): void {
		callApiMethod('group', group)
	}

	setPhone(phone: string): void {
		callApiMethod('phone', phone)
	}

	setVariables(variables: Record<string, string | boolean | number>): void {
		callApiMethod('variables', variables)
	}

	chatShow(): void {
		callApiMethod('chat:show')
	}

	chatHide(): void {
		callApiMethod('chat:hide')
	}

	chatOpen(): void {
		callApiMethod('chat:open')
	}

	chatClose(): void {
		callApiMethod('chat:close')
	}

	chatMessage(text: string): void {
		callApiMethod('chat:message', text)
	}
}

function callApiMethod(name: string, ...args: any[]): void {
	if (!win.smartsupp) {
		throw new Error('Smartsupp client was not initialized')
	}
	win.smartsupp(name, ...args)
}

const sdk = new SmartsuppSdk()
export default sdk
