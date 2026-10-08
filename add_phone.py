import re

files = ['index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html']

# The existing phone line to insert after
old_phone = '<li><a href="tel:+919834118628"><span class="f-ico">📞</span>+91 98341 18628</a></li>'
new_phone_block = '''<li><a href="tel:+919834118628"><span class="f-ico">📞</span>+91 98341 18628</a></li>
        <li><a href="tel:+919373259489"><span class="f-ico">📞</span>+91 93732 59489</a></li>'''

for fname in files:
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    if old_phone in content:
        new_content = content.replace(old_phone, new_phone_block, 1)
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"SUCCESS: {fname}")
    else:
        print(f"SKIP (not found): {fname}")
