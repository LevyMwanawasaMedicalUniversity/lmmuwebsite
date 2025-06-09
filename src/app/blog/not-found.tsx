import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="gradient-container gradient-primary pattern-container pattern-dots p-5 rounded-4 shadow">
            <div className="circle-decoration circle-medium pos-top-right"></div>
            <div className="triangle-decoration triangle-small pos-bottom-left"></div>
            
            <h1 className="display-4 fw-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="lead text-white mb-4">
              Sorry, the blog post you're looking for doesn't exist or may have been removed.
            </p>
            <Link href="/blog" className="btn btn-lg gradient-gold text-white rounded-pill px-5 py-3 hover-scale">
              Return to Blog <i className="fa fa-arrow-left ms-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
