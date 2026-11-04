const mapping = {
  'Locket': ['Gold', 'com.locket02.premium.yearly'],
  'VSCO': ['pro', 'vsco_pro_annual'],
  'Mojo': ['pro', 'video.mojo.pro.yearly'],
  'HTTPBot': ['pro', 'com.behindtechlines.HTTPBot.prounlock'],
  '1Blocker': ['premium', 'blocker.ios.subscription.yearly'],
  'Structured': ['pro', 'structured.pro.yearly'],
  'Splice': ['splice_plus_access', 'com.path36.SpliceFree.1y_t150_bundle'],
  'Facetune': ['facetune.vip', 'com.lightricks.Facetune2.vip.yearly']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

var subData = {
  "is_sandbox": false,
  "ownership_type": "PURCHASED",
  "billing_issues_detected_at": null,
  "period_type": "normal",
  "expires_date": "2099-12-31T23:59:59Z",
  "grace_period_expires_date": null,
  "unsubscribe_detected_at": null,
  "original_purchase_date": "2024-01-01T00:00:00Z",
  "purchase_date": "2024-01-01T00:00:00Z",
  "store": "app_store"
};

var entitlementData = {
  "grace_period_expires_date": null,
  "purchase_date": "2024-01-01T00:00:00Z",
  "product_identifier": "com.locket02.premium.yearly",
  "expires_date": "2099-12-31T23:59:59Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [entitlementKey, productId] = mapping[match];
  entitlementData.product_identifier = productId;
  obj.subscriber.subscriptions[productId] = subData;
  obj.subscriber.entitlements[entitlementKey] = entitlementData;
} else {
  // Fallback mặc định cho Locket nếu User-Agent bị ẩn hoặc thay đổi
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = subData;
  obj.subscriber.entitlements["Gold"] = entitlementData;
}

$done({ body: JSON.stringify(obj) });
