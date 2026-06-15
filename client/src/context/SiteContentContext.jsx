import { createContext, useContext, useEffect, useState } from "react";
import { fetchSiteContent } from "../services/contentApi";
import siteContentDefaults from "../config/siteContentDefaults";

const SiteContentContext = createContext(siteContentDefaults);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(siteContentDefaults);

  useEffect(() => {
    fetchSiteContent()
      .then((res) => setContent(res.data))
      .catch(() => {});
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export default SiteContentContext;
