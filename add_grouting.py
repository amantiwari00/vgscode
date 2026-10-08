import re

with open('services.html', encoding='utf-8') as f:
    content = f.read()

grouting_card = """    <div class="service-card-wrap reveal d5">
      <div class="service-card-inner">
        <div class="service-front">
          <span class="service-icon">&#128137;</span>
          <h3>Grouting</h3>
          <ul>
            <li>Cement Grouting</li>
            <li>Chemical Grouting</li>
            <li>Permeation Grouting</li>
            <li>Compaction Grouting</li>
            <li>Jet Grouting</li>
            <li>Rock Fissure Grouting</li>
            <li>Curtain Grouting</li>
            <li>Contact &amp; Consolidation Grouting</li>
            <li>Void Filling Grouting</li>
          </ul>
          <span class="flip-hint">Hover to learn more</span>
        </div>
        <div class="service-back">
          <h3>Grouting</h3>
          <p>We provide comprehensive grouting solutions for ground improvement, waterproofing, and structural rehabilitation. Our grouting services strengthen weak soils, seal water-bearing fissures in rock, and stabilize foundations for dams, tunnels, buildings, and infrastructure projects across India. We use technically approved materials and methods tailored to site-specific conditions.</p>
          <a href="contact.html">Get a Quote &#8594;</a>
        </div>
      </div>
    </div>

  </div>
</section><!-- FOOTER -->"""

# Replace the closing div+section (just before FOOTER comment)
new_content = re.sub(
    r'  </div>\s*\n</section><!-- FOOTER -->',
    grouting_card,
    content,
    count=1
)

if new_content == content:
    print("ERROR: Pattern not matched — check file structure")
else:
    with open('services.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Grouting card added to services.html")
