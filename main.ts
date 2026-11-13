Deno.serve(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // faviconの404対策
  if (url.pathname === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }

  // 1. IP情報取得APIエンドポイント
  if (url.pathname === "/api/ip") {
    const targetIp = url.searchParams.get("ip") || "";
    const apiUrl = targetIp
      ? `https://ipapi.co/${targetIp}/json/`
      : `https://ipapi.co/json/`;

    try {
      const apiRes = await fetch(apiUrl);
      const data = await apiRes.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    } catch (_e) {
      return new Response(
        JSON.stringify({ error: true, reason: "API request failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        },
      );
    }
  }

  // 2. 静的ファイルの明示的なルーティング配信（パスのズレを完全に防ぎます）
  try {
    let filePath = "";
    let contentType = "text/html; charset=utf-8";

    if (url.pathname === "/" || url.pathname === "/index.html") {
      filePath = "./public/index.html";
    } else if (url.pathname === "/style.css") {
      filePath = "./public/style.css";
      contentType = "text/css; charset=utf-8";
    } else if (url.pathname === "/app.js") {
      filePath = "./public/app.js";
      contentType = "application/javascript; charset=utf-8";
    }

    if (filePath) {
      const fileContent = await Deno.readTextFile(filePath);
      return new Response(fileContent, {
        headers: { "Content-Type": contentType },
      });
    }
  } catch (_e) {
    // ファイルが存在しない場合は404へ進む
  }

  return new Response("Not Found", { status: 404 });
});
