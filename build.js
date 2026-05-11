const fs = require('fs');
const path = require('path');

const root = __dirname;
const templatePath = path.join(root, 'src', 'template.html');
const pagesConfigPath = path.join(root, 'src', 'pages.json');

function ensureDirectoryForFile(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function relativePath(from, to) {
    const relative = path.relative(path.dirname(from), to).replace(/\\/g, '/');
    return relative === '' ? '.' : relative;
}

function buildPage(page) {
    const outputPath = path.join(root, page.output);
    const contentPath = path.join(root, page.contentPath);
    const template = fs.readFileSync(templatePath, 'utf8');
    const pageContent = fs.readFileSync(contentPath, 'utf8');

    const assetPrefix = relativePath(outputPath, path.join(root, '.'));
    const indexLink = relativePath(outputPath, path.join(root, 'index.html'));
    const legalLink = relativePath(outputPath, path.join(root, 'content', 'legal.html'));
    const teamLink = relativePath(outputPath, path.join(root, 'content', 'about', 'team.html'));

    const html = template
        .replace(/{{PAGE_TITLE}}/g, page.title)
        .replace(/{{NAV_TITLE}}/g, page.navTitle)
        .replace(/{{HERO_TITLE}}/g, page.heroTitle)
        .replace(/{{HERO_SUBTITLE}}/g, page.heroSubtitle)
        .replace(/{{PAGE_OUTPUT}}/g, page.output)
        .replace(/{{ASSET_PREFIX}}/g, assetPrefix)
        .replace(/{{INDEX_LINK}}/g, indexLink)
        .replace(/{{LEGAL_LINK}}/g, legalLink)
        .replace(/{{TEAM_LINK}}/g, teamLink)
        .replace(/{{MAIN_CONTENT}}/g, pageContent);

    ensureDirectoryForFile(outputPath);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Built ${page.output}`);
}

function main() {
    if (!fs.existsSync(templatePath)) {
        console.error('Template file not found:', templatePath);
        process.exit(1);
    }

    const pagesConfig = JSON.parse(fs.readFileSync(pagesConfigPath, 'utf8'));
    pagesConfig.forEach(buildPage);
}

main();
