from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__, static_folder=os.getcwd(), template_folder=os.getcwd())

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:filename>', methods=['GET', 'POST'])
def serve_files(filename):
    if filename.endswith('.html'):
        return render_template(filename)
    return send_from_directory(app.static_folder, filename)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(os.path.join(app.static_folder, 'images'), filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
