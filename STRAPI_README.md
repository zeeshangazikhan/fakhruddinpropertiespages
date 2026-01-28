# Strapi CMS Integration Guide

This guide explains how to set up Strapi CMS to manage content for the Fakhruddin Properties landing page.

## Quick Start

### 1. Install Strapi

Create a new Strapi project in a separate folder:

```bash
npx create-strapi@latest strapi-cms --quickstart
```

This will:
- Create a new Strapi project with SQLite (for development)
- Open the admin panel at `http://localhost:1337/admin`
- Prompt you to create an admin user

### 2. Create Content Types

In Strapi Admin, go to **Content-Type Builder** and create the following **Single Types**:

#### Hero (Single Type)
| Field Name | Type | Required |
|------------|------|----------|
| tagline | Short Text | Yes |
| title | Short Text | Yes |
| subtitle | Short Text | Yes |
| description | Long Text | Yes |
| buttonText | Short Text | Yes |
| backgroundImage | Media (Single) | No |
| stats | Component (Repeatable) | No |

**Stats Component** (create as reusable component):
| Field Name | Type |
|------------|------|
| value | Short Text |
| label | Short Text |

#### Overview (Single Type)
| Field Name | Type | Required |
|------------|------|----------|
| sectionTitle | Short Text | Yes |
| totalUnitsLabel | Short Text | Yes |
| totalUnits | Number (Integer) | Yes |
| projectName | Short Text | Yes |
| units | Component (Repeatable) | Yes |

**Unit Component**:
| Field Name | Type |
|------------|------|
| title | Short Text |
| size | Short Text |
| count | Number (Integer) |
| price | Short Text |

#### EOI Form (Single Type)
| Field Name | Type | Required |
|------------|------|----------|
| sectionTitle | Short Text | Yes |
| depositAmount | Short Text | Yes |
| depositDescription | Short Text | Yes |
| developerName | Short Text | Yes |
| developerAddress | Short Text | Yes |
| developerTel | Short Text | Yes |
| developerEmail | Email | Yes |
| reraNumber | Short Text | Yes |
| processDescription | Long Text | Yes |
| unitAllocationNote | Long Text | Yes |
| refundNote | Long Text | Yes |
| termsAndConditions | Rich Text | Yes |
| eoiSteps | Component (Repeatable) | Yes |

**EOI Step Component**:
| Field Name | Type |
|------------|------|
| step | Long Text |

### 3. Set Permissions

Go to **Settings > Users & Permissions plugin > Roles > Public**

Enable the following for each content type:
- `find` (for Single Types)
- `findOne` (optional)

### 4. Populate Content

Go to **Content Manager** and add content for:
- Hero
- Overview  
- EOI Form

Click **Save** and **Publish** for each.

### 5. Configure Next.js

Copy the environment example file:

```bash
cp .env.local.example .env.local
```

Update the Strapi URL if needed:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### 6. Run the Application

```bash
# Terminal 1: Run Strapi
cd strapi-cms
npm run develop

# Terminal 2: Run Next.js
cd fakhruddin-landing-page
npm run dev
```

## API Endpoints

Once configured, Strapi will expose these endpoints:

| Content | Endpoint |
|---------|----------|
| Hero | `GET /api/hero?populate=*` |
| Overview | `GET /api/overview?populate=*` |
| EOI Form | `GET /api/eoi-form?populate=*` |

## Production Deployment

### Strapi Hosting Options

1. **Railway** (recommended for beginners)
   - Free tier available
   - One-click PostgreSQL setup
   - Auto-deploys from GitHub

2. **Render**
   - Free tier with limitations
   - Easy PostgreSQL integration

3. **DigitalOcean App Platform**
   - $5/month minimum
   - Managed PostgreSQL available

4. **VPS (DigitalOcean Droplet, Linode, etc.)**
   - Full control
   - Requires manual setup

### Environment Variables for Production

```env
# Database (PostgreSQL recommended)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=secure_password
DATABASE_SSL=true

# Strapi
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=random_salt
ADMIN_JWT_SECRET=random_secret
JWT_SECRET=another_random_secret

# CORS (allow your Next.js domain)
# Configure in config/middlewares.js
```

### CORS Configuration

In your Strapi project, update `config/middlewares.js`:

```js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://your-nextjs-domain.com', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // ... other middlewares
];
```

## Troubleshooting

### Content not loading?
1. Check if Strapi is running (`http://localhost:1337/admin`)
2. Verify content is published (not just saved)
3. Check public permissions are set
4. Check browser console for CORS errors

### CORS errors?
- Ensure your Next.js domain is in Strapi's CORS config
- For local development, both should run on localhost

### Images not showing?
- Use `getStrapiMediaUrl()` helper from `lib/strapi.ts`
- Ensure Media Library permissions are set to public

## File Structure

```
lib/
  strapi.ts       # Strapi fetch helpers and types
.env.local        # Environment variables (copy from .env.local.example)
STRAPI_README.md  # This file
```

## Support

For Strapi documentation: https://docs.strapi.io
