  {/* Projects Section */}
  <motion.section
    id="projects"
    className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={sectionVariants}
  >
    <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
      $ ls -la ~/projects | grep "featured"
    </h2>
    <ProjectsSection />
  </motion.section>

  {/* Tech Stack Section */}
  <motion.section
    id="tech-stack"
    className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={sectionVariants}
  >
    <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
      $ tech-stack --list-all
    </h2>
    <TechStackSection />
  </motion.section>

  {/* Beyond the Code Section */}
  <motion.section
    id="beyond-code"
    className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={sectionVariants}
  >
    <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
      $ beyond-code --show-interests
    </h2>
    <BeyondCodeSection />
  </motion.section>

  {/* Contact Section */}
  <motion.section
    id="contact"
    className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={sectionVariants}
  >
    <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
      $ contact-me --send-message
    </h2>
    <ContactSection />
  </motion.section> 