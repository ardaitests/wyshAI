# Chat Widget Packages

This directory contains versioned chat widget implementations for different use cases. Each version is highly configurable and can be customized to match your application's branding and requirements.

## Local Stylesheet

Each version includes a local copy of the n8n chat stylesheet for better reliability and offline development. The stylesheet is located at:
- For v1: `v1/src/styles/n8n-chat.css`
- For v2: `v2/src/styles/n8n-chat.css`

To use the local stylesheet in your project, include it in your HTML:

```html
<link href="path/to/chat-widget/v1/src/styles/n8n-chat.css" rel="stylesheet">
```

## Available Versions

This directory contains versioned chat widget implementations for different use cases. Each version is highly configurable and can be customized to match your application's branding and requirements.

## Available Versions

### v1 (CRM/Treehouse Style)
- **Location**: `/v1/`
- **Usage**: For standard chat interfaces with basic theming
- **Dependencies**: None (vanilla JS)
- **Example Configuration**:
  ```javascript
  {
    webhook: {
      url: 'https://api.example.com/webhook',
      route: 'general'
    },
    branding: {
      logo: 'images/your-logo.png',
      name: 'Your Assistant',
      welcomeText: 'Hello! How can I help you today?',
      poweredBy: {
        text: 'Powered by Your Company',
        link: 'https://example.com',
        show: true
      }
    },
    style: {
      primaryColor: '#4f46e5',
      secondaryColor: '#4338ca',
      backgroundColor: '#ffffff',
      fontColor: '#1f2937',
      position: 'right',
      buttonText: 'Chat with us',
      buttonRadius: '30px'
    },
    behavior: {
      autoOpen: false,
      showHeader: true,
      showPoweredBy: true
    }
  }
  ```

### v2 (Rescheduler Style)
- **Location**: `/v2/`
- **Usage**: For advanced chat interfaces with additional features
- **Dependencies**: May include additional libraries
- **Example Configuration**:
  ```javascript
  {
    api: {
      endpoint: 'https://api.example.com/v2/chat',
      route: 'general',
      version: 'v2'
    },
    branding: {
      logo: 'images/your-logo.png',
      name: 'Your Assistant',
      welcomeText: 'Hello! How can I assist you today?',
      poweredBy: {
        text: 'Powered by Your Company',
        link: 'https://example.com',
        show: true
      }
    },
    style: {
      theme: 'modern',
      primaryColor: '#0f766e',
      secondaryColor: '#0d9488',
      buttonText: 'Need help?',
      buttonIcon: 'fas fa-comment-dots'
    },
    behavior: {
      autoOpen: false,
      showWelcomeMessage: true,
      enableNotifications: true
    }
  }
  ```

## Installation

For each version, navigate to its directory and install dependencies:

```bash
cd public/demos/chat-widget/v1  # or v2
npm install
```

## Building

To build a specific version:

```bash
# Development build with source maps
npm run dev

# Production build (minified)
npm run build
```

## Usage

### HTML Integration

```html
<!-- Include the built JS file -->
<script src="/path/to/chat-widget/v1/dist/chat-widget.js"></script>

<!-- Initialize with your configuration -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // For v1
    const chatV1 = new ChatWidget.v1({
      webhook: {
        url: 'https://api.example.com/webhook',
        route: 'support'
      },
      branding: {
        logo: 'images/your-logo.png',
        name: 'Support Chat',
        welcomeText: 'Hello! How can we help you today?',
        poweredBy: {
          text: 'Powered by Your Company',
          link: 'https://example.com'
        }
      },
      style: {
        primaryColor: '#4f46e5',
        buttonText: 'Need help?',
        position: 'right'
      }
    });

    // For v2
    const chatV2 = new ChatWidget.v2({
      api: {
        endpoint: 'https://api.example.com/v2/chat',
        route: 'general'
      },
      branding: {
        logo: 'images/your-logo.png',
        name: 'AI Assistant',
        welcomeText: 'Hello! I\'m here to help.'
      },
      style: {
        theme: 'modern',
        primaryColor: '#0f766e',
        buttonText: 'Chat with us'
      }
    });
  });
</script>
```

## Configuration Options

### Common Options (v1 & v2)

#### Branding
- `branding.logo`: URL to your logo image
- `branding.name`: Display name for the chat widget
- `branding.welcomeText`: Initial welcome message
- `branding.poweredBy.text`: Customize the "Powered by" text
- `branding.poweredBy.link`: Link for the "Powered by" text
- `branding.poweredBy.show`: Toggle visibility of the "Powered by" section

#### Style
- `style.primaryColor`: Primary brand color
- `style.secondaryColor`: Secondary brand color
- `style.backgroundColor`: Chat background color
- `style.fontColor`: Text color
- `style.position`: Position of the chat button ('left' or 'right')
- `style.buttonText`: Text for the chat button
- `style.buttonIcon`: Icon class for the button (e.g., 'fas fa-comment-dots')
- `style.buttonRadius`: Border radius for the button
- `style.buttonShadow`: Box shadow for the button

### v1 Specific
- `webhook.url`: Endpoint for the chat webhook
- `webhook.route`: Route identifier for the webhook
- `behavior.showHeader`: Toggle the chat header
- `behavior.showPoweredBy`: Toggle the "Powered by" section

### v2 Specific
- `api.endpoint`: API endpoint for v2 chat
- `api.route`: Route identifier for the API
- `api.version`: API version
- `style.theme`: Theme name ('modern' or other available themes)
- `behavior.showWelcomeMessage`: Toggle the welcome message
- `behavior.enableNotifications`: Toggle desktop notifications
```

## Versioning

- **v1**: Stable version used in CRM and Treehouse demos
- **v2**: Newer version with additional features, used in Rescheduler

## Adding a New Version

1. Create a new version directory (e.g., `v3/`)
2. Copy the basic structure from an existing version
3. Update the webpack configuration if needed
4. Update this README with information about the new version
