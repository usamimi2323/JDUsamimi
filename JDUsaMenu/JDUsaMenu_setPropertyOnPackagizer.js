/**
 * JDownloader2 EventScript - setProperty for Revert Original Name in JDUsaMenu.js
 *
 * JDUsaMenu用の
 * 「名前を元に戻す」用リンクプロパティ設定
 * 「登録元ページを開く」用リンクプロパティ設定
 *
 * Trigger:ON_PACKAGIZER (パッケージャのフック時)
 */
(function(){
	const prop_name1 = "ORIGIN_NAME";
	const prop_name2 = "PACKAGIZER_NAME";
	const prop_name3 = "SOURCE_URL";
	const SOURCE_URL_KEYNAME_IN_URL = "ref";
	
	var regexp_is_url_ok = /^https?:\/\//;
	var regexp_get_SOURCE_URL = new RegExp('#(?:.*&)?'+SOURCE_URL_KEYNAME_IN_URL+'=([^&]*)(?:&.*)?$','i');
	
	// check
	if (link.getProperty(prop_name1))
		return;
	if (state=='BEFORE')
	{
		link.setProperty(prop_name1, link.name);
		
		link.getSourceUrls() && link.getSourceUrls().some(function(u)
		{
			var r = u.match(regexp_get_SOURCE_URL);
			if (!r || !r[1]) return false;
			var url = decodeURIComponent(r[1]);
			if (regexp_is_url_ok.test(url))
			{
				link.setProperty(prop_name3, url);
			}
			return true;
		});
	}
	else if (state == 'AFTER')
	{
		link.setProperty(prop_name2, link.name);
	}
})();

