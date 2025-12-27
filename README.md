# German Campos Portfolio Website

A minimal, elegant portfolio website for audiovisual projects with **Netlify CMS** for easy content management.

## ✨ What's Included

### Main Website
- Clean, minimal design (white background, black text)
- Dynamic project grid with category filtering
- Modal slideshow for project details
- YouTube video integration
- Mobile responsive
- Fast and lightweight

### Netlify CMS Admin Panel
- Professional, user-friendly interface
- Auto-saves to Git
- Auto-deploys on publish
- Image upload handling
- No technical knowledge required
- Completely free

## 🚀 Quick Start

### **→ [See NETLIFY_DEPLOYMENT.md for full setup instructions](NETLIFY_DEPLOYMENT.md)**

**Summary:**
1. Create GitHub repository
2. Upload these files
3. Connect to Netlify
4. Enable Netlify Identity
5. Access CMS at `/admin/`

**That's it!** Your client can now manage everything through a beautiful admin interface.

## 📁 File Structure

```
/
├── index.html                  # Main website
├── styles.css                  # Website styles  
├── app-netlify.js             # Website functionality (Netlify CMS compatible)
├── admin/
│   ├── index.html             # Netlify CMS interface
│   └── config.yml             # CMS configuration
├── data/
│   ├── projects/              # Individual project files
│   │   └── sample-project.json
│   ├── pages/                 # Page content files
│   │   ├── bio.json
│   │   ├── press.json
│   │   ├── cv.json
│   │   └── contact.json
│   └── projects-manifest.json # List of all projects
├── uploads/                   # Uploaded images
└── netlify.toml              # Netlify configuration
```

## 🎨 Using the CMS

After deployment, go to `https://your-site.netlify.app/admin/`

### Add a Project
1. Click "Projects" → "New Projects"
2. Fill in Title, Date, Category, Description
3. Add media (YouTube URLs or upload images)
4. Click "Publish"
5. **Site updates automatically in 30 seconds!**

### Edit Pages
1. Click "Pages" → Select page
2. Edit content with rich text editor
3. Click "Publish"
4. **Live instantly!**

## 🎯 Key Features

✅ **No more manual JSON editing**  
✅ **No more FTP uploads**  
✅ **No more export/import**  
✅ **Auto-deploys on save**  
✅ **Full version control via Git**  
✅ **Free hosting with HTTPS**  
✅ **Professional CMS interface**  

## 🔐 Security

- Admin access via Netlify Identity
- Invite-only user registration
- Secure authentication
- All changes tracked in Git

## 📱 Workflow

**Before (Old Admin Panel):**
1. Edit in admin panel
2. Export data
3. Update JSON files
4. Re-upload to server
5. Refresh cache
6. Hope it works

**Now (Netlify CMS):**
1. Edit in CMS
2. Click "Publish"
3. **Done!**

## 🌐 Hosting

**Free hosting options:**
- **Netlify** (Recommended) - Free HTTPS, auto-deploy, forms, functions
- **Vercel** - Alternative, similar features
- **GitHub Pages** - Basic hosting

### Custom Domain
Connect your own domain in Netlify dashboard. Free HTTPS included!

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-bg: #ffffff;
    --color-text: #000000;
}
```

### Fonts
Edit `styles.css`:
```css
:root {
    --font-main: Arial, sans-serif;
}
```

## 🐛 Troubleshooting

**Projects not showing?**
- Check `data/projects-manifest.json` is updated
- Run `node generate-manifest.js` to regenerate

**CMS not accessible?**
- Make sure Netlify Identity is enabled
- Check Git Gateway is enabled

**Changes not deploying?**
- Check Netlify deploy log
- Wait ~30 seconds for deploy to complete

## 📚 Documentation

- **[Full Deployment Guide](NETLIFY_DEPLOYMENT.md)** ← Start here!
- **[Netlify Docs](https://docs.netlify.com)**
- **[Netlify CMS Docs](https://www.netlifycms.org/docs/)**

## 💡 Why Netlify CMS?

**Previous attempts with custom CMS were buggy because:**
- No proper data persistence
- localStorage limitations  
- Manual file management
- No version control

**Netlify CMS solves all of this:**
- Git-based (bulletproof storage)
- Professional interface
- Auto-deployment
- Free and open-source
- Proven and reliable

## 🎉 That's It!

Your client can now:
- Add/edit projects with a beautiful interface
- Upload images with drag-and-drop
- Update pages without touching code
- See changes live in 30 seconds
- Never worry about data loss (Git backup)

**Admin URL**: `https://your-site.netlify.app/admin/`

Enjoy! 🚀

