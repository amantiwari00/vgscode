import os
import glob

html_files = ['services.html', 'privacy-policy.html', 'original_index.html']

for file in html_files:
    if not os.path.exists(file): continue
    try:
        with open(file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        if '<link rel="icon"' not in content:
            # Replace the last occurrence of </head> (though there should only be one)
            content = content.replace('</head>', '  <link rel="icon" href="vgs_logo.png" type="image/png">\n</head>')
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added favicon to {file}")
        else:
            print(f"Favicon already exists in {file}")
    except Exception as e:
        print(f"Failed on {file}: {e}")
