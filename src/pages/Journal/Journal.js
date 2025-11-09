import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { blogPosts, categories } from "./journalData";

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  // Filter posts based on category and search term
  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.some(paragraph => paragraph.toLowerCase().includes(searchLower)) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setSubscribed(true);
        setEmail("");
        // Reset after 3 seconds
        setTimeout(() => setSubscribed(false), 3000);
      }, 1000);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Journal" prevLocation={prevLocation} />
      
      <div className="py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Orebi Journal</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights, trends, and stories from the world of e-commerce, technology, and lifestyle.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primeColor"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                    selectedCategory === category
                      ? "bg-primeColor text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== "All" || searchTerm) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPosts.length} of {blogPosts.length} articles
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8 mb-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="pb-8 border-b border-gray-200 last:border-b-0">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Post Image */}
                  {post.image && (
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {/* Post Content */}
                  <div className={`${post.image ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-primeColor text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.date}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-primeColor transition duration-300">
                      <Link to={`/journal/${post.id}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      to={`/journal/${post.id}`}
                      className="inline-flex items-center text-primeColor font-semibold hover:text-black transition duration-300"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
              <button
                onClick={clearFilters}
                className="bg-primeColor text-white px-6 py-2 rounded hover:bg-black transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

       {/* Newsletter Section */}
      <div className="bg-primeColor rounded-lg p-8 text-white mb-8">
      <div className="max-w-2xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
    <p className="mb-6 opacity-90">
      Get the latest articles, product updates, and exclusive offers delivered to your inbox.
    </p>
    
    {subscribed ? (
      <div className="bg-green-500 text-white px-4 py-3 rounded">
        Thank you for subscribing! You'll receive our next update.
      </div>
    ) : (
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="bg-white text-primeColor px-8 py-3 rounded font-semibold hover:bg-gray-100 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    )}
  </div>
</div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Explore More?</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Discover amazing products and continue your shopping journey with Orebi.
          </p>
          <Link to="/shop">
            <button className="bg-primeColor text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Journal;