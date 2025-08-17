<?php get_header(); ?>

<nav class="navigation">
    <div class="nav-links">
        <a href="#insights">Business Insights</a>
        <a href="#case-studies">Case Studies</a>
        <a href="#about">About This Site</a>
    </div>
</nav>

<section class="hero hero-animation">
    <div class="hero-content">
        <div class="hero-image" style="width: 120px; height: 120px; border-radius: 15px; background: linear-gradient(135deg, var(--accent-color), #FFA500); margin: 0 auto var(--spacing-xl); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: var(--primary-light); font-weight: bold; border: 3px solid rgba(255,255,255,0.3);">📊</div>
        
        <h1><?php 
            if (is_home() || is_front_page()) {
                echo get_post_meta(get_option('page_on_front'), '_hero_title', true) ?: 'Business Automation Insights';
            } else {
                the_title();
            }
        ?></h1>
        
        <p><?php 
            if (is_home() || is_front_page()) {
                echo get_post_meta(get_option('page_on_front'), '_hero_subtitle', true) ?: 'Real-world strategies from 10 successful businesses and 22 years of operational excellence';
            } else {
                echo get_the_excerpt() ?: bloginfo('description');
            }
        ?></p>
        
        <p><?php 
            if (is_home() || is_front_page()) {
                $hero_desc = get_post_meta(get_option('page_on_front'), '_hero_description', true);
                if ($hero_desc) {
                    echo $hero_desc;
                } else {
                    echo 'Discover what actually works, what doesn\'t, and <a href="#insights" style="color: var(--accent-color); text-decoration: underline;">why most automation projects fail</a>';
                }
            }
        ?></p>
    </div>
</section>

<?php if (is_home() || is_front_page()): ?>
    <!-- Static homepage content -->
    <section id="insights" class="insights-grid">
        <div class="insight-card">
            <h3><span class="insight-icon">💡</span>The 80/20 Rule of Business Automation</h3>
            <p>After implementing automation across 10 businesses over 21 years—from paper-driven operations to digital startups—I've discovered that 80% of efficiency gains come from just 20% of available options. The businesses I've helped transform have collectively earned over 2,500 five-star Google reviews by focusing on systematic improvements rather than complex solutions.</p>
            
            <div class="roi-highlight">
                🎯 Focus Area: Communication & Scheduling = 60% of Time Savings
            </div>
            
            <div class="case-study">
                <h4>Real Transformation: Paper-Driven Service Business</h4>
                <p>Took a completely manual, telephone-intensive operation from zero computerization to fully automated workflows. Result: 40% reduction in processing time, 250+ five-star reviews, and owner reclaimed 20 hours per week. Total transformation cost: $180/month.</p>
            </div>
        </div>

        <div class="insight-card">
            <h3><span class="insight-icon">⚠️</span>Why 67% of Automation Projects Fail</h3>
            <p>From watching businesses struggle with automation, I've identified the top 3 reasons projects fail: starting too big, ignoring employee adoption, and choosing tools before understanding processes.</p>
            
            <div class="warning-box">
                <h4>Common Mistake</h4>
                <p>Buying enterprise software for a 3-person office is like using a sledgehammer to hang a picture. Start small, prove value, then scale.</p>
            </div>
            
            <p><strong>The Fix:</strong> Start with one manual process that everyone complains about. Automate that completely before moving to the next one.</p>
        </div>

        <div class="insight-card">
            <h3><span class="insight-icon">📊</span>The Hidden Cost of Manual Processes</h3>
            <p>Most business owners think they're saving money by doing things manually. The math tells a different story. A typical 3-person office wastes $74,550 annually on inefficient processes.</p>
            
            <div class="roi-highlight">
                💰 Average Waste: $24,850 per person per year
            </div>
            
            <p><strong>Breakdown:</strong></p>
            <ul class="efficiency-list">
                <li>Email hunting: 45 min/day = $8,775/year</li>
                <li>Phone tag: 30 min/day = $5,850/year</li>
                <li>Manual data entry: 1 hour/day = $19,500/year</li>
                <li>Lost files: 15 min/day = $2,925/year</li>
            </ul>
        </div>

        <div class="insight-card">
            <h3><span class="insight-icon">🔧</span>The "Good Enough" Strategy</h3>
            <p>Military experience taught me that perfect is the enemy of done. In business automation, a 70% solution implemented today beats a 100% solution planned for next month.</p>
            
            <div class="case-study">
                <h4>Personal Example: My First Business</h4>
                <p>Spent 6 months researching the "perfect" CRM system. Meanwhile, lost 3 clients due to poor follow-up. Finally chose a simple $15/month solution and implemented it in 2 hours. Immediately stopped losing clients.</p>
            </div>
            
            <p><strong>The Lesson:</strong> Start with tools that are "good enough" and upgrade later. Motion beats perfection every time.</p>
        </div>

        <div class="insight-card">
            <h3><span class="insight-icon">🎯</span>The Employee Adoption Formula</h3>
            <p>The best automation tool is worthless if your team won't use it. After implementing systems in multiple businesses, I've discovered the formula for guaranteed adoption.</p>
            
            <p><strong>The Formula: Pain + Benefit + Simplicity = Adoption</strong></p>
            
            <div class="case-study">
                <h4>Proven Approach</h4>
                <ol>
                    <li><strong>Identify Pain:</strong> What manual task does everyone hate?</li>
                    <li><strong>Show Benefit:</strong> "This saves you 30 minutes daily"</li>
                    <li><strong>Make Simple:</strong> One-click solutions win every time</li>
                    <li><strong>Train Gradually:</strong> One feature per week, not all at once</li>
                </ol>
            </div>
        </div>

        <div class="insight-card">
            <h3><span class="insight-icon">💎</span>The $100 Rule for Tool Selection</h3>
            <p>Before investing in any business tool, I apply the $100 rule: if it doesn't save at least $100 in the first month, it's not worth implementing. This simple filter has saved thousands in software costs.</p>
            
            <div class="roi-highlight">
                🧮 Quick Calculation: (Hours Saved × Hourly Rate) - Monthly Cost = Net Benefit
            </div>
            
            <p><strong>Real Examples That Pass the Test:</strong></p>
            <ul class="efficiency-list">
                <li>Calendly: Saves 5 hours/month scheduling = $325 value for $8 cost</li>
                <li>LastPass: Saves 2 hours/month on passwords = $130 value for $3 cost</li>
                <li>Zapier: Saves 8 hours/month on data entry = $520 value for $20 cost</li>
            </ul>
            
            <p>For detailed implementation guides and performance analysis of these and 100+ other tools, see my <a href="https://mickleyofficeautomation.com/" style="color: var(--primary-light); text-decoration: underline;">comprehensive tool reviews</a> based on real-world testing across multiple business types.</p>
        </div>
    </section>

    <section class="stats-section">
        <h2 style="font-size: 1.8rem; margin-bottom: var(--spacing-lg);">Automation Impact Across My 5 Businesses</h2>
        <p style="font-size: 1.1rem; margin-bottom: var(--spacing-2xl); max-width: 600px; margin-left: auto; margin-right: auto;">Real data from implementing automation solutions across different industries and business sizes</p>
        
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-number">127</span>
                <div class="stat-label">Hours Saved Monthly</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">$18,200</span>
                <div class="stat-label">Annual Labor Savings</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">94%</span>
                <div class="stat-label">Error Reduction</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">3.2x</span>
                <div class="stat-label">Faster Processing</div>
            </div>
        </div>
        
        <p style="margin-top: var(--spacing-xl); font-size: 1.1rem; max-width: 600px; margin-left: auto; margin-right: auto;">Want to apply these strategies to your business? <a href="https://microofficeautomation.com/" style="color: var(--accent-color); text-decoration: underline;">Explore our automation solutions</a> designed for small businesses.</p>
    </section>

    <section id="about" class="about-section">
        <div class="about-content">
            <h2>Why These Insights Matter</h2>
            <div class="about-text">
                <p><strong>Real-World Testing:</strong> These insights come from implementing automation solutions across 10 different businesses over 21 years—from paper-driven operations with zero computerization to digital startups built from concepts. Every recommendation has been tested in live business environments that collectively earned over 2,500 five-star Google reviews.</p>
                
                <p><strong>Failure Analysis:</strong> I've made every automation mistake possible, from choosing overcomplicated tools to ignoring employee training needs. These insights help you avoid the expensive lessons I learned the hard way.</p>
                
                <p><strong>Military Precision:</strong> 22 years as an Air Force instructor pilot, including 20 years teaching systematic evaluation and improvement, gave me unique skills for analyzing business systems. Learn more about <a href="https://brianmickleyautomation.com/" style="color: var(--primary-light); text-decoration: underline;">how military training creates better business automation strategies</a>.</p>
                
                <p><strong>Small Business Focus:</strong> Everything here is designed for businesses with 1-10 employees. No enterprise solutions, no million-dollar budgets, no dedicated IT departments. Just practical solutions that work for real small businesses.</p>
                
                <p><strong>Continuous Updates:</strong> As I discover new tools and strategies, this site evolves. Business automation is constantly changing, and these insights reflect current best practices, not outdated advice.</p>
            </div>
        </div>
    </section>

    <!-- BLOG DISCOVERY SECTION - NOW IN CORRECT LOCATION -->
    <section class="recent-posts-section" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: var(--spacing-2xl); margin: var(--spacing-2xl) 0; border-radius: 12px; border: 1px solid #dfe8f3;">
        <div style="text-align: center; margin-bottom: var(--spacing-2xl);">
            <h2 style="color: var(--primary-color); font-size: 1.8rem; margin-bottom: var(--spacing-md);">📚 Latest Automation Case Studies & Insights</h2>
            <p style="font-size: 1.1rem; color: var(--text-light); max-width: 600px; margin: 0 auto;">
                Real implementations, detailed breakdowns, and lessons learned from actual automation projects
            </p>
        </div>

        <?php
        // Get recent blog posts
        $recent_posts = new WP_Query(array(
            'post_type' => 'post',
            'posts_per_page' => 3,
            'post_status' => 'publish'
        ));

        if ($recent_posts->have_posts()) : ?>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--spacing-xl); margin-bottom: var(--spacing-2xl);">
                <?php while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
                    <article class="blog-preview-card" style="background: white; padding: var(--spacing-xl); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 4px solid var(--accent-color); transition: transform 0.3s ease;">
                        <div style="margin-bottom: var(--spacing-md);">
                            <span style="background: var(--primary-color); color: white; padding: var(--spacing-xs) var(--spacing-sm); border-radius: 15px; font-size: 0.8rem; font-weight: 600;">
                                <?php echo get_the_date('M j, Y'); ?>
                            </span>
                        </div>
                        
                        <h3 style="margin-bottom: var(--spacing-md); font-size: 1.2rem; line-height: 1.4;">
                            <a href="<?php the_permalink(); ?>" style="color: var(--primary-color); text-decoration: none;"><?php the_title(); ?></a>
                        </h3>
                        
                        <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-color); margin-bottom: var(--spacing-lg);">
                            <?php echo wp_trim_words(get_the_excerpt() ?: get_the_content(), 25, '...'); ?>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <a href="<?php the_permalink(); ?>" style="color: var(--accent-color); font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: var(--spacing-xs);">
                                Read Case Study <span style="font-size: 1.2rem;">→</span>
                            </a>
                            <?php if (get_the_category()): ?>
                                <span style="color: var(--text-light); font-size: 0.85rem;">
                                    <?php echo get_the_category()[0]->name; ?>
                                </span>
                            <?php endif; ?>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Blog Navigation -->
            <div style="text-align: center; padding: var(--spacing-xl); background: white; border-radius: 8px; border: 2px solid var(--primary-color);">
                <h4 style="color: var(--primary-color); margin-bottom: var(--spacing-md);">Want More Automation Insights?</h4>
                <p style="margin-bottom: var(--spacing-lg); color: var(--text-light);">
                    Explore our complete library of case studies, implementation guides, and automation strategies
                </p>
                <a href="/blog/" style="background: var(--primary-color); color: white; padding: var(--spacing-md) var(--spacing-xl); border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; transition: all 0.3s ease;">
                    📖 View All Blog Posts
                </a>
            </div>

        <?php else : ?>
            <!-- No posts yet - show coming soon -->
            <div style="text-align: center; padding: var(--spacing-2xl); background: white; border-radius: 12px; border: 2px dashed var(--border-light);">
                <div style="font-size: 3rem; margin-bottom: var(--spacing-lg);">📝</div>
                <h3 style="color: var(--primary-color); margin-bottom: var(--spacing-md);">Case Studies Coming Soon</h3>
                <p style="color: var(--text-light); margin-bottom: var(--spacing-lg); max-width: 500px; margin-left: auto; margin-right: auto;">
                    We're preparing detailed case studies showing real automation implementations, ROI calculations, and step-by-step breakdowns.
                </p>
                <a href="mailto:info@microofficeautomation.com?subject=Case Study Updates" style="background: var(--accent-color); color: var(--primary-color); padding: var(--spacing-md) var(--spacing-xl); border-radius: 8px; text-decoration: none; font-weight: 600;">
                    📬 Get Notified When Published
                </a>
            </div>
        <?php endif; ?>

        <?php wp_reset_postdata(); ?>
    </section>
    <!-- END BLOG DISCOVERY SECTION -->

<?php else: ?>
    <!-- Blog/post listing or individual post content -->
    <div class="content-area">
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <h1 class="entry-title"><?php the_title(); ?></h1>
                        <div class="entry-meta">
                            <span class="posted-on">Posted on <?php echo get_the_date(); ?></span>
                            <span class="byline"> by <?php the_author(); ?></span>
                        </div>
                    </header>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>

                    <footer class="entry-footer">
                        <?php if (get_the_tags()): ?>
                            <span class="tags-links">
                                Tags: <?php the_tags('', ', ', ''); ?>
                            </span>
                        <?php endif; ?>
                    </footer>
                </article>
            <?php endwhile; ?>
            
            <div class="pagination">
                <?php echo paginate_links(); ?>
            </div>
        <?php else : ?>
            <p>No posts found.</p>
        <?php endif; ?>
    </div>
<?php endif; ?>

<?php get_footer(); ?>