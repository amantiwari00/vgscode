with open('gallery.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 0-297 (first section closes at line 298, index 297)
# Skip lines 298-627 (orphaned duplicate content)
# Keep lines 628 onwards (lightbox, footer, etc.) but skip the stray </section>
# Line 629 (index 628) is </section><!-- LIGHTBOX --> - skip the </section> part

keep = lines[0:298]  # first 298 lines (correct gallery)

# From line 629 onward, skip the leading </section>
rest = lines[628:]
# rest[0] is '</section><!-- LIGHTBOX -->\r\n' - strip the </section> prefix
rest[0] = rest[0].replace('</section>', '', 1)

keep += rest

with open('gallery.html', 'w', encoding='utf-8') as f:
    f.writelines(keep)

print(f"Done! Total lines: {len(keep)}")
