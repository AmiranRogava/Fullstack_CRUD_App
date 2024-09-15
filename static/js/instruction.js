// Initialize markdown-it with highlight.js integration
const md = window.markdownit({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
        }
        return ''; // use external default escaping
    }
});


// Example Markdown string
const markdownString = `
# ინსტრუქცია

კოდი ჩაწერეთ აუცილებლად **კომენტარის** შემდეგ  
ფუნქციის შიდა კოდის დასრულების შემდეგ წაშალეთ **print(function(element_or_variable))**

---

## ფუნქციის დაწერის ფორმატი

\`\`\`python
# ფუნქციის სახელი (არგუმენტი)
def function_name(argument):

... აქ იწერება შიდა პროცესის კოდი ...

return result

# ფუნქციის გამოძახება
print(function(element_or_variable))
\`\`\`

## მაგალითი

\`\`\`python
# მისალმების ფუნცია
def hello(name):
return "hello " + name

print(hello("David"))
\`\`\`

## გთხოვთ, კოდი დაწერეთ კომენტარის ბლოკის შემდეგ

\`\`\`python
"""კომენტარი"""

... აქ იწერება ფუნქცია ...
\`\`\`

## საბოლოოდ ასე უნდა გამოიყურებოდეს

\`\`\`python
"""კომენტარი"""


# მისალმების ფუნცია
def hello(name):
return "hello " + name
\`\`\`
`;

// Render the markdown to HTML
const result = md.render(markdownString);

// Insert the rendered HTML into the content div
const contentDiv = document.getElementById('content');
contentDiv.innerHTML = result;

// Append the "Home" button
const homeButton = document.createElement('a');
homeButton.href = "/";
homeButton.className = "ui-btn";
homeButton.style.textDecoration = "none";
homeButton.innerHTML = '<span>Home</span>';

contentDiv.appendChild(homeButton);

// Apply Highlight.js to the rendered content
document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
});
