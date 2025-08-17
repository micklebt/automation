<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    
    <?php wp_head(); ?>
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "<?php bloginfo('name'); ?>",
      "description": "<?php bloginfo('description'); ?>",
      "url": "<?php echo home_url(); ?>",
      "author": {
        "@type": "Person",
        "name": "Brian Mickley",
        "url": "https://brianmickleyautomation.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MicroOffice Automation",
        "url": "https://microofficeautomation.com/"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why do 67% of automation projects fail?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most automation projects fail due to three main reasons: starting too big, ignoring employee adoption, and choosing tools before understanding processes."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 80/20 rule of business automation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "80% of efficiency gains come from just 20% of available automation options, with communication and scheduling providing 60% of time savings."
            }
          }
        ]
      }
    }
    </script>
</head>
<body <?php body_class(); ?>>

<?php wp_body_open(); ?>

<div id="breadcrumb-container"></div>