import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { blogPosts } from "./journalData";

const JournalDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    setPrevLocation(location.state?.data || "");

    // Find the current post
    const currentPost = blogPosts.find(post => post.id === parseInt(id));
    setPost(currentPost);

    // Find related posts (same category, excluding current post)
    if (currentPost) {
      const related = blogPosts
        .filter(p => p.id !== parseInt(id) && p.category === currentPost.category)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [id, location]);

  if (!post) {
    return (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Post Not Found" prevLocation={prevLocation} />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h2>
          <Link to="/journal">
            <button className="bg-primeColor text-white px-6 py-2 rounded hover:bg-black transition duration-300">
              Back to Journal
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title={post.title} prevLocation={prevLocation} />

      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="bg-primeColor text-white px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{post.excerpt}</p>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content && post.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Post Footer */}
        <footer className="border-t border-gray-200 pt-8 mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Published on {post.date} • {post.readTime} read
          </p>
        </footer>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/journal/${relatedPost.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">{relatedPost.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{relatedPost.excerpt}</p>
                  <span className="text-primeColor text-sm font-semibold">Read More →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-8 pb-8">
          <Link
            to="/journal"
            className="bg-primeColor text-white px-6 py-2 rounded hover:bg-black transition duration-300"
          >
            Back to Journal
          </Link>
          <Link
            to="/shop"
            className="border border-primeColor text-primeColor px-6 py-2 rounded hover:bg-primeColor hover:text-white transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>

      </article>
    </div>
  );
};

export default JournalDetail;