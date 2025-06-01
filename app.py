from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__, static_folder=os.getcwd(), template_folder=os.getcwd())

# Route for the main index page
@app.route('/')
def index():
    return render_template('index.html')

# Route for question-specific HTML pages
# This will also serve CSS, JS from the root if not matched by other specific routes
@app.route('/<path:filename>', methods=['GET', 'POST'])
def serve_files(filename):
    # If it's an HTML file, render it as a template
    # This will handle both GET requests to view the page
    # and POST requests from forms (like in q3.html) by re-rendering the page.
    if filename.endswith('.html'):
        return render_template(filename)
    # Otherwise, serve it as a static file from the root directory
    return send_from_directory(app.static_folder, filename)

# Route for images within the 'images' subdirectory
@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(os.path.join(app.static_folder, 'images'), filename)

if __name__ == '__main__':
    # Make sure to run in debug mode for development
    # Port 5000 is standard for Flask, can be changed if needed
    app.run(debug=True, port=5000)
