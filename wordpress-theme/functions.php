<?php
// Enqueue styles and scripts
function microoffice_theme_assets() {
    // Enqueue shared CSS framework
    wp_enqueue_style('microoffice-main', get_template_directory_uri() . '/shared/main.css', array(), '1.0');
    
    // Enqueue shared scripts
    wp_enqueue_script('microoffice-scripts', get_template_directory_uri() . '/shared/scripts.js', array(), '1.0', true);
    
    // Page-specific styles for this theme
    wp_add_inline_style('microoffice-main', '
        .hero-animation::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"20\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"20\" cy=\"80\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"80\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/></svg>") repeat;
            animation: float 20s infinite linear;
            pointer-events: none;
        }
        
        @keyframes float {
            0% { transform: translateX(-100px) translateY(-100px); }
            100% { transform: translateX(100px) translateY(100px); }
        }
        
        .insight-icon {
            font-size: 1.5rem;
        }
    ');
}
add_action('wp_enqueue_scripts', 'microoffice_theme_assets');

// Add theme support
function microoffice_theme_setup() {
    // Add featured image support
    add_theme_support('post-thumbnails');
    
    // Add title tag support
    add_theme_support('title-tag');
    
    // Add custom logo support
    add_theme_support('custom-logo');
    
    // Register navigation menu
    register_nav_menus(array(
        'primary' => 'Primary Navigation',
    ));
}
add_action('after_setup_theme', 'microoffice_theme_setup');

// Add custom fields support (requires Advanced Custom Fields plugin or similar)
function add_hero_meta_box() {
    add_meta_box(
        'hero-fields',
        'Hero Section',
        'hero_meta_box_callback',
        'page'
    );
}
add_action('add_meta_boxes', 'add_hero_meta_box');

function hero_meta_box_callback($post) {
    wp_nonce_field('save_hero_meta_box_data', 'hero_meta_box_nonce');
    
    $hero_subtitle = get_post_meta($post->ID, '_hero_subtitle', true);
    $hero_description = get_post_meta($post->ID, '_hero_description', true);
    
    echo '<table class="form-table">';
    echo '<tr>';
    echo '<th><label for="hero_subtitle">Hero Subtitle</label></th>';
    echo '<td><input type="text" id="hero_subtitle" name="hero_subtitle" value="' . esc_attr($hero_subtitle) . '" size="50" /></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<th><label for="hero_description">Hero Description</label></th>';
    echo '<td><textarea id="hero_description" name="hero_description" rows="3" cols="50">' . esc_textarea($hero_description) . '</textarea></td>';
    echo '</tr>';
    echo '</table>';
}

function save_hero_meta_box_data($post_id) {
    if (!isset($_POST['hero_meta_box_nonce'])) return;
    if (!wp_verify_nonce($_POST['hero_meta_box_nonce'], 'save_hero_meta_box_data')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['hero_subtitle'])) {
        update_post_meta($post_id, '_hero_subtitle', sanitize_text_field($_POST['hero_subtitle']));
    }
    if (isset($_POST['hero_description'])) {
        update_post_meta($post_id, '_hero_description', sanitize_textarea_field($_POST['hero_description']));
    }
}
add_action('save_post', 'save_hero_meta_box_data');
?>