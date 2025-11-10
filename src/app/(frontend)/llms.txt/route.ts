export const dynamic = 'force-static';

const TXT_CONTENT = `
# Tushar Gaurav's Personal Website

## Site Overview

This is the personal website of Tushar Gaurav, a software developer 
and graphic designer who creates content about technology, programming, 
Linux, 3D printing, and web development. 

The site features technical tutorials, guides, and personal insights 
into various tech topics.

## Main Sections

### Home
- URL: https://www.tushgaurav.com/
- Latest articles and blog posts
- Recent work and updates

### Blog Articles
- URL: https://www.tushgaurav.com/article/
- Technical tutorials and guides
- Personal tech experiences
- Software development insights

## Featured Content

### 3D Printing
- "Beginner's Guide to 3D Printing" (Oct 2025)
- Covers basics of 3D printing, choosing printers, filament selection, slicing, and print quality tips
- Target audience: Hobbyists and makers starting their 3D printing journey

### Linux & Open Source
- "Linux Ecosystem for Noobs" (Dec 2024)
- Creating Apple-like Linux ecosystem using KDE Connect, Syncthing, tmux, and SSH
- Phone integration, file syncing, and terminal session management

### Web Development
- "Evolution of a Webmaster: My Web Dev Journey" (Feb 2024)
- Personal programming and web development journey
- From beginner to current state

### System Customization
- "Beginner's Guide to Bash Customization" (Apr 2024)
- Personalizing bash shell appearance and functionality

- "Must Try Gnome Extensions" (Dec 2023)
- Curated list of essential Gnome Shell extensions

### Industry Commentary
- "WordPress Drama" (Sep 2024)
- Analysis of Matt Mullenweg and WP Engine controversy
- Impact on WordPress community

## About the Author

Tushar Gaurav is a software developer at Orangewood Labs, 
working on RoboGPT - a platform for programming robotic arms using natural language. 
He specializes in web development, AI integration, clean code solutions, and user experience design.

## Topics Covered

- Software Development
- Web Development (Next.js, React, Payload CMS)
- Linux & Open Source
- System Administration
- 3D Printing
- IoT & Homelab
- Bash/Shell Scripting
- Gnome Desktop Environment
- Tech Industry Analysis
- Programming Tutorials

## Content Format

- Tutorial-style guides (4-8 minute reads)
- Beginner-friendly explanations
- Practical, hands-on content
- Technical documentation
- Personal experiences and insights

## Target Audience

- Software developers
- Tech enthusiasts
- Linux users
- Makers and hobbyists
- Web development learners
- Homelab enthusiasts
- Open source advocates

## Contact & Social

All socials are at @tushgaurav on all platforms.

For collaboration or inquiries, visitors can reach out through the website's contact form.


---

*Last updated: November 2025*
`

export function GET() {
    return new Response(TXT_CONTENT);
}