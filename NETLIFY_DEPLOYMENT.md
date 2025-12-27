# Netlify CMS Deployment Guide

## 🎉 You're Now Using Netlify CMS!

This is a **much better** solution than the old admin panel. Here's why:
- ✅ Auto-saves directly to Git
- ✅ Auto-deploys when you save
- ✅ Beautiful, professional admin interface
- ✅ Image upload handling
- ✅ No manual JSON editing
- ✅ Completely free

---

## 📋 Prerequisites

1. **GitHub Account** (free) - sign up at github.com
2. **Netlify Account** (free) - sign up at netlify.com

---

## 🚀 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to github.com and log in
2. Click the **"+"** button (top right) → **New repository**
3. Name it: `german-campos-portfolio` (or whatever you like)
4. Set to **Public** (or Private if you have a paid GitHub account)
5. **DO NOT** initialize with README
6. Click **Create repository**

### Step 2: Upload Your Files to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. On your new empty repository page, click **"uploading an existing file"**
2. Drag and drop ALL your portfolio files
3. Scroll down, add commit message: "Initial commit"
4. Click **Commit changes**

**Option B: Using Git (If you're comfortable with command line)**

```bash
cd /path/to/your/portfolio-folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/german-campos-portfolio.git
git push -u origin main
```

### Step 3: Deploy to Netlify

1. Go to **netlify.com** and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository: `german-campos-portfolio`
6. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `/` (root)
7. Click **"Deploy site"**

**Wait 1-2 minutes for deployment to complete.**

### Step 4: Enable Netlify Identity

1. In your Netlify dashboard, go to **Site settings**
2. Click **"Identity"** in the left sidebar
3. Click **"Enable Identity"**
4. Under **Registration preferences**, select **"Invite only"** (recommended)
5. Under **External providers**, you can optionally enable Google/GitHub login
6. Scroll to **Services** → **Git Gateway** → Click **"Enable Git Gateway"**

### Step 5: Invite Yourself as Admin

1. Still in the **Identity** section
2. Click **"Invite users"**
3. Enter your client's email address
4. They'll receive an invitation email
5. Click the link in the email to set a password

### Step 6: Access Your CMS!

1. Go to: `https://YOUR-SITE-NAME.netlify.app/admin/`
2. Log in with the credentials you just created
3. Start adding projects!

---

## 🎨 Using the CMS

### Adding a Project

1. Go to `/admin/`
2. Click **"Projects"** in the sidebar
3. Click **"New Projects"**
4. Fill in:
   - **Title**: Project name
   - **Date**: 2024 or "March 2024"
   - **Category**: Select from dropdown
   - **Description**: Project details
   - **Slug**: URL-friendly name (e.g., `my-awesome-project`)
5. Click **"Add Media"** to add media items:
   - **Type**: Choose YouTube, Image, or Audio
   - For YouTube: Paste the full YouTube URL
   - For Images: Click "Choose an image" to upload
   - For Audio: Paste audio URL and optionally upload a waveform image
6. Click **"Publish"** (top right)

**Your site automatically redeploys and updates in ~30 seconds!**

### Editing Pages

1. Go to `/admin/`
2. Click **"Pages"** in the sidebar
3. Select Bio, Press, CV, or Contact
4. Edit using the rich text editor
5. Use the toolbar for formatting, images, links
6. Click **"Publish"**

**Changes go live automatically!**

### Managing Images

- Upload images directly in the CMS
- Max 5MB per image recommended
- Images are stored in the `/uploads` folder in your Git repo
- Netlify handles all the processing

---

## 🔐 Security

### Inviting More Users

If you need to give access to someone else:
1. Netlify Dashboard → Site → Identity
2. Click "Invite users"
3. Enter their email
4. They receive an invitation link

### Changing Password

1. Go to `/admin/`
2. Click your email (top right)
3. Click "Change password"

---

## 📱 Workflow After Setup

**Your new workflow is incredibly simple:**

1. Go to `https://your-site.netlify.app/admin/`
2. Log in
3. Add/edit content
4. Click "Publish"
5. **Done!** Site updates automatically in 30 seconds

**No more:**
- ❌ Manual JSON editing
- ❌ FTP uploads
- ❌ Export/import data
- ❌ Technical headaches

---

## 🎯 Custom Domain (Optional)

To use your own domain (e.g., `germancampos.com`):

1. Netlify Dashboard → **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Netlify provides **free HTTPS** automatically!

---

## 🐛 Troubleshooting

### "Can't access /admin/"
- Make sure you've enabled Netlify Identity
- Make sure Git Gateway is enabled
- Check that you've been invited as a user

### "Changes not showing up"
- Check the Netlify deploy log (it takes ~30 seconds)
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear cache

### "Images not uploading"
- Check file size (max 5MB recommended)
- Try a different image format (JPG, PNG, WebP)
- Check your Git LFS settings if files are very large

### "Projects not showing on site"
- Make sure the `data/projects-manifest.json` file is updated
- Or use the auto-update script (see Advanced section)

---

## 🔧 Advanced: Auto-Update Manifest

The site needs to know which project files exist. There are two approaches:

**Option 1: Manual Update (Simple)**
When you add a new project, also update `data/projects-manifest.json`:
```json
[
  "sample-project.json",
  "new-project.json",
  "another-project.json"
]
```

**Option 2: Auto-Generate (Recommended)**
Create a simple build script. Contact me if you need help with this.

---

## 📊 Analytics (Optional)

Add Google Analytics:
1. Netlify Dashboard → **Site settings** → **Build & deploy**
2. Under **Post processing**, click **"Snippet injection"**
3. Add your Google Analytics code

---

## 💾 Backups

**Your content is automatically backed up!**
- Every change is stored in Git
- Full version history on GitHub
- You can roll back any change

To download a backup:
1. Go to your GitHub repository
2. Click **"Code"** → **"Download ZIP"**

---

## 🎊 You're All Set!

Your portfolio is now:
- ✅ Live on the internet
- ✅ Easy to update via CMS
- ✅ Auto-deploying
- ✅ Backed up to Git
- ✅ Free to host
- ✅ Fast and secure

**Admin URL**: `https://your-site.netlify.app/admin/`  
**Public URL**: `https://your-site.netlify.app/`

---

## 📞 Need Help?

- **Netlify Docs**: docs.netlify.com
- **Netlify CMS Docs**: netlifycms.org/docs
- **Community Forum**: answers.netlify.com

Enjoy your new portfolio! 🚀
