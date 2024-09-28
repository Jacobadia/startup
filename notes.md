### September 14th,
#### How to use GitHub
1. **GitHub Hosting:**
   - Stores code, provides version control, allows for collaboration, and looks good on resumes.
   - Offers extra features like website hosting, issue tracking, project management, and continuous deployment.

2. **Cloning a Repository:**
   - Use `git clone [URL]` to get a copy of the repository onto your local machine.
   - Remember to be in the right directory before cloning.

3. **Making Changes:**
   - After making changes locally, use `git add`, `git commit`, and `git push` to update the repository on GitHub.

4. **Basic Git Commands:**
   - `git pull`: Get the latest changes from GitHub.
   - `git commit -am "message"`: Commit changes with a message.
   - `git push`: Push changes to GitHub.
   
5. **Handling Merge Conflicts:**
   - Conflicts occur when two people modify the same line of code.
   - Resolve by editing the file manually in VS Code, keeping the desired changes from both commits.

6. **README.md and notes.md:**
   - README.md: Describes your project, displayed on the GitHub repository page.
   - notes.md: Personal notes for learning and documentation, useful for reference.

## Git Commands Cheat Sheet

- Add changes: `git add <file-name>`
- Commit: `git commit -am "commit message"`
- Push: `git push`
- Pull: `git pull`

---

### September 20th,

### Key AWS Commands:
`ssh -i /c/Users/Jacob/.ssh/Turtles.pem ubuntu@98.84.2.156`

`exit`

### Domain Name & DNS Setup with AWS Route 53

AWS Route 53: This service allows you to buy a domain, manage DNS records, and handle DNS routing for your web application.

A record: Maps your domain to your server’s public IP address.

Wildcard record (*): Maps any subdomain to your server's IP.

Here is a concise summary of the relevant HTML information for your `notes.md` file:

---

### HTML Overview
- **HTML** provides content structure for web apps.
- **Single Page Applications (SPA)** and **Multi-Page Applications (MPA)** are built using HTML.
- HTML is combined with **CSS** for styling and **JavaScript** for interactivity.

### HTML Document Structure
- **Tags**: Define elements with `<tagname>` and `</tagname>`.
  - Example: `<p>Hello world</p>`.
- **Basic Structure**:
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Title Here</title>
    </head>
    <body>
      <main>
        <p>Hello world</p>
      </main>
    </body>
  </html>
  ```

### Common HTML Elements
- **Structure**: 
  - `<html>`: Top-level container.
  - `<head>`: Metadata (e.g., `<title>`).
  - `<body>`: Main content.
  - `<main>`: Central content section.
- **Headings**: `<h1>` to `<h6>`, highest to lowest priority.
- **Text**: 
  - `<p>`: Paragraph.
  - `<b>`: Bold text.
  - `<span>`: Inline element for small text parts.
- **Lists**: 
  - `<ol>`: Ordered list.
  - `<ul>`: Unordered list.
  - `<li>`: List item.
- **Links**: 
  - `<a href="url">link text</a>`.
- **Tables**:
  - `<table>`, `<tr>`, `<th>`, `<td>`: Table, row, header, data.
- **Images**:
   - `<img src="https://www.example.com/images" alt="description" />`  
  
### Attributes
- **Common Attributes**: 
  - `id`: Unique element identifier.
  - `class`: Classifies elements into groups.
  
### Special Characters
- Use **entities** for reserved characters:  
  - `&lt;` = `<`, `&gt;` = `>`, `&amp;` = `&`.

### Rendering
- **index.html**: Default file served by a web server.
- Can open HTML locally in a browser or use **CodePen** for quick testing.

---


