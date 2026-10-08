import os
import chardet

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for file in html_files:
    with open(file, 'rb') as f:
        raw_data = f.read(1000)
        result = chardet.detect(raw_data)
        print(f"{file}: {result['encoding']} (confidence {result['confidence']})")
