import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {contentLoader, contentPath} from "../contentLoader";
import "/src/css/article_styles.css";

export default function ContentPage() {
    const {slug} = useParams();
    const {pathname} = useLocation();
    const isBlog = pathname.toLowerCase().startsWith("/blog/");
    const path = contentPath(isBlog ? "blog_posts" : "articles", slug);
    const backTo = isBlog ? "/blog" : "/articles";
    const backLabel = isBlog ? "back to blog posts" : "back to Academic & Technical Writing";
    const [result, setResult] = useState(null);
    const [attempt, setAttempt] = useState(0);
    const cached = contentLoader.peek(path);
    // Never display a previous route's content or error while the new request starts.
    const current = result?.path === path && result.attempt === attempt ? result : null;
    const content = cached ?? current?.content;
    const error = content === undefined ? current?.error : null;
    const loading = content === undefined && !error;

    useEffect(() => {
        let active = true;
        contentLoader.load(path).then(
            (html) => {
                if (active) setResult({path, attempt, content: html});
            },
            (failure) => {
                if (active) setResult({path, attempt, error: failure.message});
            }
        );
        // Keep shared requests alive for prefetch/revisits, but ignore obsolete results.
        return () => { active = false; };
    }, [path, attempt]);

    return (
        <div>
            <Link to={backTo}>
                <h3 className="back">{backLabel}</h3>
            </Link>
            {loading && <p role="status">Loading…</p>}
            {error && (
                <div role="alert">
                    <p>{error}</p>
                    <button type="button" onClick={() => setAttempt((value) => value + 1)}>Try again</button>
                </div>
            )}
            <div aria-busy={loading} dangerouslySetInnerHTML={{__html: content || ""}} />
            <Link to={backTo}>
                <h3 className="back end_back">{backLabel}</h3>
            </Link>
        </div>
    );
}
