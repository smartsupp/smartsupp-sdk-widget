# Smartsupp Widget SDK

## Installation

```bash
npm install smartsupp-widget --save
```

## Usage

Initialize script with your `KEY` and options. For more information about options you can visit [Docs](https://docs.smartsupp.com/chat-box/configuration/)

```typescript
import smartsupp from 'smartsupp-widget'
smartsupp.init('YOUR_KEY', {
    hideWidget: true,
})
```

After `init`, you can use api, eg:

```typescript
smartsupp.setName('John Doe')
```

For more info visit https://docs.smartsupp.com
