---
layout: default
title: Blog
permalink: /blog1/
---

<div class="blog-page">
  <h1 class="page-title">Blog Posts</h1>
  <p class="page-description">Thoughts, stories, and ideas</p>

<section class="featured-section">
  <h2 class="section-title">Latest Posts</h2>

  {% if site.posts.size > 0 %}
    <div class="posts-grid">

      {% for post in site.posts %}
        <article class="post-card">
          <div class="post-card-header">
            {% if post.image %}
              <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" class="post-card-image">
            {% else %}
              <div class="post-card-placeholder">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
            {% endif %}
          </div>

          <div class="post-card-content">
            <time class="post-date" datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d, %Y" }}
            </time>

            <h3 class="post-card-title">
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </h3>

            {% if post.excerpt %}
              <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
            {% endif %}

            {% if post.tags %}
              <div class="post-tags">
                {% for tag in post.tags limit:3 %}
                  <span class="tag">{{ tag }}</span>
                {% endfor %}
              </div>
            {% endif %}

            <a href="{{ post.url | relative_url }}" class="read-more">
              Read More →
            </a>
          </div>
        </article>
      {% endfor %}

    </div>

  {% endif %}

  <!-- RSS Subscription -->
  <div class="rss-subscribe">
    <p>
      <a href="{{ '/feed.xml' | relative_url }}" class="rss-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
        </svg>
        Subscribe via RSS
      </a>
    </p>
  </div>

</section>
</div>
