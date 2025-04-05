/** 
 * JDownloader2 EventScript - JDUsaMenu 右クリックメニュー集
 * 
 * 【概要】
 * リネーム/検索/移動/並べ替えなどの右クリックメニューを追加する Event Script
 *
 * 実装済み：
 * ・リネーム各種
 * ・ローカルファイル検索（Everythingを呼び出す）
 * ・WEB検索（ブラウザを呼び出す）
 * ・特定ホストだけを有効/無効
 * ・パッケージ並べ替え
 * ・リンクグラバーに再登録
 * ・名前付き新しいパッケージに移動
 * 　(既存の標準メニューにも「新しいパッケージに移動」は存在するが、
 * 　ダイアログが開くのでその無駄を省く)
 *
 *
 * 日本語ファイル名でのJD2への登録とファイル保存運用が基本
 * 作者名やタイトルに関しては、日本語ファイル名の命名規則に
 * 則っている必要がある
 *
 * 命名規則例： (カテゴリ) [作者名A×作者名B] タイトル 第01-25巻
 *
 *
 * JDについては、Windows環境で動作確認
 *
 * 当該コードを利用することで生じるいかなる損失、被害、影響もコード製作者は責任を負いません
 * 改変転載自由、全て自己責任
 *
 *
 *
 * 【設定】
 *
 * UserConfig内を自分の環境に合わせて書き換える
 *
 * UserConfig.path内のパスを書き換える
 * UserConfig.SEARCH_WEB内の設定を自分用に書き換える
 * USerConfig.menuConfig.enableOnlyHost
 * USerConfig.menuConfig.disableHost
 *
 * 【使い方】
 *
 * ----------------------
 * (0) 前提
 * ----------------------
 * 　　JDownloader2 に「イベントスクリプト拡張モジュール」をインストール(必須)
 *
 * ----------------------
 * (1) スクリプトの登録
 * ----------------------
 * 　　「設定」→「イベントスクリプト」→「＋追加」ボタンから新しいスクリプトを追加
 *
 * 　　チェックボックスをチェックし有効化、トリガーには
 * 　　　『ダウンロードリストコンテキストメニュー選択時』
 * 　　　『リンクグラバーリストコンテキストメニュー選択時』
 * 　　どちらかを選択する（スクリプトの名前は任意）
 *
 * 　　「編集」ボタンを押し、スクリプトエディタ画面を表示
 *
 * 　　このスクリプトファイル全体をコピー＆ペーストし「保存」ボタンを押し保存する。
 *
 * 　　※もう一度繰り返し、ダウンロードリストとリンクグラバーの両方ともトリガーされるようにする
 *
 * ----------------------
 * (2) メニュー項目の追加
 * ----------------------
 * 　　保存した後に再度、「編集」ボタンからスクリプトエディタ画面を表示する
 *
 * 　　・自動でメニュー項目を追加したい場合
 *
 * 　　　　　　「試行」ボタン(TestRun)を押すとメニュー項目の自動インストールモードに移行、
 * 　　　　　　メッセージに従ってインストールする
 *
 * 　　・手動でメニュー項目を追加したい場合
 *
 * 　　　　　　「右クリックメニュー：＊＊＊＊＊」ボタンを押して「メニュー管理画面」を開く、
 * 　　　　　　「＋ボタン」またはコンテキストメニューから「アクション追加」
 * 　　　　　　→「EventTrigger」→プロパティの名前を追加したいアクションの「メニュー名」にする
 * 　　　　　　……これを追加したいメニュー項目分繰り返す
 *
 * 　　※これらのメニュー項目は後でメニュー管理画面から編集可能。
 *
 *
 *
 * -----------------------------------------------------------------------------------------------------------
 * メニュー名                                 説明
 * -----------------------------------------------------------------------------------------------------------
 * Everythingで検索(タイトル)                 Everythingで検索する（(△△) [○○] □□ の□□を検索ワードに）
 * Everythingで検索(作者名)                   Everythingで検索する（(△△) [○○] □□ の○○を検索ワードに）
 * ブラウザで開く                             設定したブラウザで選択されているリンクを開く
 * 
 * JDバックアップフォルダを開く
 * 登録元ページを開く                         登録元（リンクにsourceUrlがあれば）を開く
 * 
 * パッケージ名で名前を揃える                 パッケージ名でパッケージ内のリンクの名前を揃える
 * 
 * このリンクの名前でパッケージ内を全て揃える 選択しているリンクの名前で、パッケージとパッケージ内のリンクの名前を揃える
 *                                            （各パッケージ内でリンクを一つだけ選択）
 * 
 * 名前を揃える                               右クリックされたリンク（もしくは選択された一番上のリンクの名前）で
 *                                            選択されているリンクの名前を揃える※１
 *                                            
 * 名前を揃える(作者名)                       選択などは※１と同様　(○○) [△△] □□ の[△△]を揃える
 * 名前を揃える(タイトル)                     選択などは※１と同様　(○○) [△△] □□ の□□を揃える
 * 名前を揃える(カテゴリ+作者名)              選択などは※１と同様　(○○) [△△] □□ の(○○) [△△]を揃える
 * 名前を揃える(カテゴリ+作者名+タイトル)     選択などは※１と同様　(○○) [△△] □□ 第01-04巻の(○○) [△△] □□を揃える
 * 
 * 第○○巻化                                 v01を第01巻にリネーム
 * 
 * []内のスワップ                             [○○×△△]→[△△×○○]
 * []内の末尾切り捨て                         [○○×△△×□□]→[○○×△△]
 * []内のxを×に変換                          [○○x△△]→[○○×△△]
 * 
 * 名前の数字の桁揃え                         名前の数字の桁を揃える（0埋め、最小桁数=2）
 * 名前の全角英数字を半角に変換
 * 名前の正規化
 * 名前のURLデコード
 * 先頭括弧を後方送り
 * 末尾の括弧削除
 *
 * 名前を元に戻す(パッケージャ適用後)...      パッケージャ適用直後の名前に戻す　※２
 * 名前を元に戻す...                          パッケージャ適用前の名前に戻す　　※２
 * 
 *                                            ※２　リンクのプロパティに該当する名前を設定しておく必要がある
 *                                            　　　別途「名前を元に戻す用」EventScript の導入が必須
 *
 * ○○ >>                                    「【追加したい文字】   >>」
 *                                            リンクまたはパッケージの名前の先頭に○○を追加する
 *                                            (○○) でカテゴリ名の場合は、追加ではなく置換する
 * 
 * << ××                                    「<<   【追加したい文字】」
 *                                            リンクまたはパッケージの名前の終端に××を追加する
 * 
 * この名前で新しいパッケージに移動           右クリックされたリンクまたはパッケージの名前を使用し
 *                                            選択されたリンクまたはパッケージを
 *                                            新しいパッケージに移動し、まとめる
 *                                            
 * リンクグラバーへ再登録                     選択されたリンクまたはパッケージをリンクグラバーに再登録する
 * 
 * タイトルで並べ替え(昇順)                   (△△) [○○] □□……選択されたパッケージを□□で昇順並べ替え
 * タイトルで並べ替え(降順)                   (△△) [○○] □□……選択されたパッケージを□□で降順並べ替え
 * 作者名で並べ替え(昇順)                     (△△) [○○] □□……選択されたパッケージを[○○]で昇順並べ替え
 * 作者名で並べ替え(降順)                     (△△) [○○] □□……選択されたパッケージを[○○]で降順並べ替え
 * 追加日時で並べ替え(昇順)                   選択されたパッケージを追加日時で昇順並べ替え
 * 追加日時で並べ替え(降順)                   選択されたパッケージを追加日時で降順並べ替え
 * カテゴリ別タイトルで並べ替え(昇順)
 * カテゴリ別タイトルで並べ替え(降順)
 * カテゴリ別作者名で並べ替え(昇順)
 * カテゴリ別作者名で並べ替え(降順)
 * 優先ホストで並べ替え(昇順)
 * 優先ホストで並べ替え(降順)
 * 
 * 優先ホスト(単一)のみ有効                   選択しているパッケージまたはリンクのURLを
 *                                            優先順のマッチングリストの先頭から順にマッチングしていき、
 *                                            該当したら、それ以外のパッケージ内のリンクを無効にする
 *                                            （UserConfig.priorityHostRule で設定可能）
 * 優先ホスト(複数)のみ有効                   選択しているパッケージまたはリンクのURLが
 *                                            マッチングリストにマッチするか否かで、パッケージ内のリンクを有効/無効にする
 *                                            （UserConfig.priorityHostRule で設定可能）
 * 
 * hogehoge.com のみ有効                       選択されたリンクからホスト名hogehoge.comを含まないリンクを無効にする
 * hogehoge.com を無効                         選択されたリンクからホスト名hogehoge.comを含んだリンクを無効にする
 *                                            ※hogehoge.comには任意のホスト名を指定可能
 *
 * hogehoge.com のみ開く                      選択されたリンクからホスト名hogehoge.comを含んだリンクのみをブラウザで開く
 *                                            ※hogehoge.comには任意のホスト名を指定可能
 * -----------------------------------------------------------------------------------------------------------
 *
 *
 * 【ローカルファイルへのアクセス】
 *
 * 　実行時に以下のローカルファイルにアクセスする
 *
 * 　[読み込み(readFile())]
 * 　・JD_HOME + '\cfg\language.json'
 * 　・JD_HOME + '\translations\org\jdownloader\gui\translate\GuiTranslation.*.lng'
 * 　・JD_HOME + '\translations\org\jdownloader\translate\JdownloaderTranslation.*.lng'
 *
 * 　[書き込み/読み込み(writeFile()/readFile())]
 * 　・JD_HOME + '\cfg\backup_*.jdDLMenu'
 * 　・JD_HOME + '\cfg\backup_*.jdLGMenu'
 *
 * 　[実行(callSync()/callAsync())]
 * 　・指定されたeverythingの実行ファイル
 * 　・指定されたbrowserの実行ファイル
 * 　・指定されたファイラーの実行ファイル
 *
 * 【トリガー】
 *
 *    『ダウンロードリストコンテキストメニュー選択時』
 *    『リンクグラバーリストコンテキストメニュー選択時』
 *
 *    このスクリプトで両方のトリガータイプに対応
 *
 *
 *
 *
 * EventScriptはrequire()を使用せず、単一ファイル
 * （requireするとlogファイルにその都度、スクリプトの内容が全て書き込まれるため
 * logファイルのサイズが大きくなる）
 *
 **/

'use strict';
const SIGNATURE = 'JDUsaMenu';
const VERSION = '14.15';

/** @enum {number} */
const findBy={author: 1, author_1st: 2, title: 3};
/** @enum {number} btnEvents*/
var btnEvents =
{
	NONE:                                  0,
	DOWNLOAD_TABLE_CONTEXT_MENU_BUTTON:    1,
	LINKGRABBER_TABLE_CONTEXT_MENU_BUTTON: 1<<1,
	DOWNLOAD_TABLE_BOTTOM_BAR_BUTTON:      1<<2,
	LINKGRABBER_BOTTOM_BAR_BUTTON:         1<<3,
	DOWNLOAD_TABLE_CONTEXT:                1      | (1<<2),
	LINKGRABBER_TABLE_CONTEXT:             (1<<1) | (1<<3),
	TriggerName:                           1<<7,	// TestRun
	NON:  0,
	DLM:  1,
	LGM:  1<<1,
	DLB:  1<<2,
	LGB:  1<<3,
	DLC:  1      | (1<<2),
	LGC:  (1<<1) | (1<<3),
};

const UserConfig =
{
// 【設定ここから】

	path:
	{
		everything : 'C:\\Program Files\\Everything\\Everything.exe',
		browser    : 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
		filer      : 'C:\\windows\\explorer.exe',
//		filer      : getEnv('WINDIR')+'\\explorer.exe',
	},
	
	SEARCH_WEB:
	{
	//----------------------------------------------------------------
	//
	// 書式 '${name}': [${part},'${URL}'],
	//
	// ${name}  メニュー名
	// ${part}  ファイル名から検索ワードに使う部分を指定する
	//          (findBy.title|findBy.author|findBy.author_1st) ※1
	// ${URL}   文字列 %REP% が検索ワードに置換されたURLがブラウザに渡される
	//          (デフォルト値) null => "https://${name}/?s=%REP%"
	//
	// ※1
	//
	// 【例】(一般小説) [作者A×作者B] タイトル ～サブタイトル～ 第01巻.zip
	//
	//   findBy.title 　　　タイトル部分　　　　　　　【例】検索ワード='タイトル'
	//   findBy.author　　　[]内の作者名部分列挙　　　【例】検索ワード='作者A OR 作者B'
	//   findBy.author_1st　[]内の作者名部分先頭のみ　【例】検索ワード='作者A'
	//
	//----------------------------------------------------------------
		//*****[ 自分用に書き換える ]*****/
//		'x3**.net'			: [findBy.author_1st,	null],
//		'bs***.com'			: [findBy.author_1st,	null],
//		'*****.se'			: [findBy.title,		'https://*****.se/search/%REP%/'],
//		'888**.**'			: [findBy.author_1st,	'https://888**.**/search.php?q=%REP%'],
//		'******nexus.com'	: [findBy.author_1st,	'https://******nexus.com/public/search.php?x=12&y=17&q=%REP%'],
//		'678**.***'			: [findBy.author_1st,	null],
//		'*****77.***'		: [findBy.author_1st,	null],
//		'dl-***.***'		: [findBy.author_1st,	null],
//		'raw*****.cc'		: [findBy.author_1st,	null],
//		'*****-zone.***'	: [findBy.author_1st,	'http://www.*****-zone.***/?submit=Search&s=%REP%'],
//		'******core.***'	: [findBy.author_1st,	null],
//		'******omg.***'		: [findBy.author_1st,	null],
//		'n******.net'		: [findBy.author_1st,	'https://n******.net/search/?q=%REP%'],
		
		// 検索
		'SEARCH_GOOGLE_AUTHOR'	: [findBy.author,	'https://www.google.com/search?q=%REP%&ie=utf-8&oe=utf-8'],
		'SEARCH_GOOGLE_TITLE'	: [findBy.title,	'https://www.google.com/search?q=%REP%&ie=utf-8&oe=utf-8'],
//		'google.com (作者)'		: [findBy.author,	'https://www.google.com/search?q=%REP%&ie=utf-8&oe=utf-8'],
//		'google.com (タイトル)'	: [findBy.title,	'https://www.google.com/search?q=%REP%&ie=utf-8&oe=utf-8'],
//		'google.com (Author)'	: [findBy.author,	'https://www.google.com/search?q=%REP%&ie=utf-8&oe=utf-8'],
//		'google.com (Title)'	: [findBy.title,	'https://www.google.com/search?q=%REP%&ie=utf-8&oe=utf-8'],
	},
	
	// 「優先ホスト(○○)のみ有効」で使用するルール
	// RegExp（正規表現）オブジェクト配列
	// ホスト名にマッチングさせる
	priorityHostRule:		[
								/hexload\.com/,			// hCaptcha
								/dailyuploads\.net/,	// reCaptchaが必須になった、クールタイムが極小、制限少ない
								/mexa\.sh/,
								/katfile\.com/,
//								/rapidgator\.net/,
//								/fikper\.com/,
//								/frdl\.(?:is|io|to)/,	// 時折、不安定。reCaptchaが必要になったり、エラー出たり
							],

	OPEN_BROWSER_INTERVAL: 2000,		// 複数のURLをブラウザで開く時の間隔（ミリ秒）
	OPEN_BROWSER_MAX: 10,				// 複数のURLをブラウザで開く時の上限数
	
	WAITTIME_FOR_EXPAND_PACKAGE:100,	// パッケージ/リンク移動後にツリー展開するまでの待機時間（ミリ秒）
	EXPAND_AFTER_NEWPACKAGE: false,		// パッケージに移動後にツリー展開したくない場合はfalseにする
	DEFAULT_EXTENSION: '.rar',			// 名前を揃えるなどの時に使うデフォルトの拡張子
	RENAME_ALIGN_FILEEXTENSION: [		// 特定のリネームで対応する拡張子
		'rar',
		'zip',
		'7z',
		'cbz',
		'cbr',
		'pdf',
		'epub',
		'html?',
		'azw3',
		'mp4',
		'mkv',
		'webm',
		'avi',
		'wmv',
	],

	//
	// ※以下の設定は、メニューアイテムインストールモードの時のみ使用
	//
	menuConfig: {
		language:null,
		// メニュー項目「<< ○○」の○○を初期設定
		RENAME_ADD_TO_END:[
			"別スキャン",
			"単行本",
			"透かし有り",
			"寄せ集め",
			"epub",
		],
		// メニュー項目「○○ >>」の○○を初期設定
		RENAME_ADD_TO_BEGIN:[
			"(一般コミック)",
			"(一般コミック・少女)",
			"(一般コミック) [雑誌]",
			"(一般小説)",
			"(一般書籍)",
			"(成年コミック)",
			"(成年コミック) [雑誌]",
			"(同人誌)",
			"(同人CG集)",
			"(18禁アニメ)",
		],
		// メニュー項目「○○のみ有効」の○○のホスト名を初期設定
		ENABLE_LINKS_BY_HOST_ONLY:[
			"dailyuploads.net",
			"hexload.com",
			"mexa.sh",
			"katfile.com",
			"rapidgator.net",
		],
		// メニュー項目「○○を無効」の○○のホスト名を初期設定
		DISABLE_LINKS_BY_HOST:[
			"frdl.is",
			"filespayouts.com",
			"filepv.com",
			"rosefile.net",
			"takefile.link",
		],
		// メニュー項目「○○のみ開く」の○○のホスト名を初期設定
		OPEN_LINKS_BY_HOST:[
			"frdl.is",
			"filespayouts.com",
			"filepv.com",
			"rosefile.net",
		],

		//
		// 右クリックメニューに追加するメニューのテンプレート
		// メニューアイテムのオブジェクト構造
		// 足りないプロパティは自動補完してメニューアイテムを構築
		//
		// サブメニュー(CONTAINER)はitemsに配列をセット
		// セパレータはname:"-"
		// コンテキストによる表示/非表示は、
		//   context:(btnEvents.LGM|btnEvents.DLM|btnEvents.LGB|btnEvents.DLB|btnEvents.LGC|btnEvents.DLC)
		//   btnEvents.LGC（リンクグラバー）かbtnEvents.DLC（ダウンロードリスト）でいい、
		//   コンテキスト値を設定すればそのコンテキストのメニューでのみ表示
		//   contextプロパティ無しにすればデフォルトは全てのメニューで表示
		//
		// 既存の各メニューアイテムも挿入可
		// 
		templateMenuItems:
		[
			{"name":"-"},
			{
				"name":"SUBMENU_RENAME_ALIGN",
				"iconKey":"edit",
				"items":[
					{"name":"RENAME_LINKS_BY_PACKAGENAME","iconKey":"edit"},
					{"name":"RENAME_PACKAGE_AND_LINKS_BY_CONTEXTLINKNAME","iconKey":"edit"},
					{"name":"-"},
					{"name":"RENAME_LINK_BY_LINKNAME","iconKey":"edit"},
					{"name":"RENAME_LINK_BY_LINK_AUTHOR","iconKey":"edit"},
					{"name":"RENAME_LINK_BY_LINK_TITLE","iconKey":"edit"},
					{"name":"RENAME_LINK_BY_LINK_CATEGORY_AUTHOR","iconKey":"edit"},
					{"name":"RENAME_LINK_BY_LINK_LONGTITLE","iconKey":"edit"},
					{"name":"-"},
					{"name":"RENAME_AUTHOR_SWAP","iconKey":"edit"},
					{"name":"RENAME_AUTHOR_CHOP","iconKey":"edit"},
					{"name":"RENAME_AUTHOR_X_TO_BATSU","iconKey":"edit"},
					{"name":"-"},
					{"name":"RENAME_NUMBERING_FORMAT","iconKey":"edit"},
					{"name":"RENAME_ALIGN_DIGITS_LENGTH","iconKey":"edit"},
					{"name":"RENAME_FULLWIDTH_TO_HALFWIDTH","iconKey":"edit"},
					{"name":"RENAME_NORMALIZE","iconKey":"edit"},
					{"name":"RENAME_URLDECODE","iconKey":"edit"},
					{"name":"-"},
					{"name":"RENAME_STARTING_BRACKETS_MOVETO_END","iconKey":"edit"},
					{"name":"RENAME_REMOVE_TRAILING_BRACKETS","iconKey":"edit"},
					{"name":"-"},
					{"name":"RENAME_TO_PACKAGIZER_NAME","iconKey":"reset"},
					{"name":"RENAME_TO_ORIGIN_NAME","iconKey":"reset"},
				]
			},
			
			{
				"name":"SUBMENU_RENAME_ADD_REPLACE",
				"iconKey":"edit",
				"items":[
					{"name":"INSERTMENU.RENAME_ADD_TO_END","iconKey":"edit"},
					{"name":"-"},
					{"name":"INSERTMENU.RENAME_ADD_TO_BEGIN","iconKey":"edit"},
					
//					{"name":"<< 別スキャン"},
//					{"name":"<< 単行本"},
//					{"name":"<< 透かし有り"},
//					{"name":"<< 寄せ集め"},
//					{"name":"-"},
//					{"name":"(一般コミック) >>"},
//					{"name":"(一般コミック・少女) >>"},
//					{"name":"(一般コミック) [雑誌] >>"},
//					{"name":"(一般小説) >>"},
//					{"name":"(一般書籍) >>"},
//					{"name":"(成年コミック) >>"},
//					{"name":"(成年コミック) [雑誌] >>"},
//					{"name":"(同人誌) >>"},
//					{"name":"(同人CG集) >>"},
//					{"name":"(18禁アニメ) >>"},
					{"name":"-"},
					{"name":"RENAME_TO_PACKAGIZER_NAME","iconKey":"reset"},
					{"name":"RENAME_TO_ORIGIN_NAME","iconKey":"reset"},
				]
			},
			{
				"name":"SUBMENU_MOVE_FILE_BROWSE",
				"iconKey":"folder_add",
				"items":[
					{
						"name":"MOVETO_NEWPACKAGE_WITH_FILENAME",
						"iconKey":"package_new",
		//				"iconKey":"folder_add",
		//				"shortcut"  :"pressed F9"
					},
					{
						"actionData" : {"setup":{"LOCATION":"AFTER_SELECTION"},"clazzName":"org.jdownloader.gui.views.linkgrabber.contextmenu.MergeToPackageAction"},
//						"name"       : "MERGETOPACKAGEACTION",
					},
					{"name":"MOVE_SAMENAME_PACKAGES_TO_PACKAGE","actionData":{"clazzName":"org.jdownloader.gui.views.downloads.action.MergeSameNamedPackagesAction"}},
					{"name":"-"},
					{
						"actionData" : {"clazzName":"org.jdownloader.gui.toolbar.action.MoveToTopAction"},
//						"name"       : "最上部に移動",
//						"shortcut"   : "alt pressed HOME",
					},
					{
						"actionData" : {"clazzName":"org.jdownloader.gui.toolbar.action.MoveUpAction"},
//						"name"       : "上に移動",
//						"shortcut"   : "alt pressed UP",
					},
					{
						"actionData" : {"clazzName":"org.jdownloader.gui.toolbar.action.MoveDownAction"},
//						"name"       : "下に移動",
//						"shortcut"   : "alt pressed DOWN",
					},
					{
						"actionData" : {"clazzName":"org.jdownloader.gui.toolbar.action.MoveToBottomAction"},
//						"name"       : "最下部に移動",
//						"shortcut"   : "alt pressed END",
					},
					{"name":"-"},
					{"name":"ADD_LINKS_TO_LINKGRABBER","iconKey":"linkgrabber","context":btnEvents.DLC},
					{"name":"-"},
					{
						"actionData" : {
							"setup":{
								"CONFIRMATIONDIALOGBEHAVIOR":"DISABLED",
							},
							"clazzName":"org.jdownloader.gui.views.linkgrabber.actions.ConfirmSelectionBarActionSub"
						},
						"name": "MOVETODOWNLOAD",
						"context":btnEvents.LGC,
					},
					{
						"actionData" : {
							"setup":{
								"AUTOSTART":"ENABLED",
								"CONFIRMATIONDIALOGBEHAVIOR":"DISABLED",
							},
							"clazzName":"org.jdownloader.gui.views.linkgrabber.actions.ConfirmSelectionBarActionSub"
						},
						"name": "MOVETODOWNLOADANDSTART",
						"context":btnEvents.LGC,
					},
					{
						"actionData" : {
							"setup":{
								"AUTOSTART":"ENABLED",
								"CONFIRMATIONDIALOGBEHAVIOR":"DISABLED",
								"FORCEDOWNLOADS":true,
							},
							"clazzName":"org.jdownloader.gui.views.linkgrabber.actions.ConfirmSelectionBarActionSub"
						},
						"name": "MOVETODOWNLOADANDFORCESTART",
						"context":btnEvents.LGC,
					},
					{
						"actionData" : {
							"setup":{
								"CONFIRMATIONDIALOGBEHAVIOR":"ENABLED",
							},
							"clazzName":"org.jdownloader.gui.views.linkgrabber.actions.ConfirmSelectionBarActionSub"
						},
						"name": "MOVETODOWNLOADAFTERCONFIRM",
						"context":btnEvents.LGC,
					},
					{"name":"-"},
					{
						"actionData" : {"clazzName":"org.jdownloader.gui.views.linkgrabber.bottombar.AddAtTopToggleAction"},
						"name"       : "ADDATTOPTOGGLEACTION",
						"context":btnEvents.LGC,
					},
					{"name":"-"},
					{
						"actionData" : {"setup":{"DEEPDECRYPTENABLED":false},"clazzName":"org.jdownloader.gui.views.linkgrabber.bottombar.PasteLinksAction"},
						"shortcut"   : "ctrl pressed V",
					},
					{
						"actionData" : {"setup":{"DEEPDECRYPTENABLED":true},"clazzName":"org.jdownloader.gui.views.linkgrabber.bottombar.PasteLinksAction"},
						"shortcut"   : "shift ctrl pressed V",
					},
				]
			},
			{
				"name":"SUBMENU_SORT",
				"iconKey":"sort",
				"items":[
					{"name":"SORT_PACKAGES_BY_TITLE_ASCENDING",           "iconKey":"exttable/sort"},
					{"name":"SORT_PACKAGES_BY_TITLE_DESCENDING",          "iconKey":"exttable/sort"},
					{"name":"SORT_PACKAGES_BY_AUTHOR_ASCENDING",          "iconKey":"exttable/sort"},
					{"name":"SORT_PACKAGES_BY_AUTHOR_DESCENDING",         "iconKey":"exttable/sort"},
					{"name":"SORT_PACKAGES_BY_CATEGORY_TITLE_ASCENDING",  "iconKey":"exttable/sort"},
					{"name":"SORT_PACKAGES_BY_CATEGORY_TITLE_DESCENDING", "iconKey":"exttable/sort"},
					{"name":"SORT_PACKAGES_BY_CATEGORY_AUTHOR_ASCENDING", "iconKey":"exttable/sort"},
					{"name":"SORT_PACKAGES_BY_CATEGORY_AUTHOR_DESCENDING","iconKey":"exttable/sort"},
					{"name":"-"},
					{"name":"SORT_PACKAGES_BY_ADDEDDATE_ASCENDING",       "iconKey":"sort"},
					{"name":"SORT_PACKAGES_BY_ADDEDDATE_DESCENDING",      "iconKey":"sort"},
					{"name":"-"},
					{"name":"SORT_PACKAGES_BY_MYRULE_ASCENDING",         "iconKey":"sort"},
					{"name":"SORT_PACKAGES_BY_MYRULE_DESCENDING",        "iconKey":"sort"},
				]
			},
			
			{
				"name":"SUBMENU_ENABLE_DISABLE",
				"iconKey":"ok",
				"items":[
					{"name":"ENABLE_LINKS_MYRULE_SINGLE","iconKey":"ok"},
					{"name":"ENABLE_LINKS_MYRULE_MULTIPLE","iconKey":"ok"},
					{"name":"-"},
					{"name":"INSERTMENU.ENABLE_LINKS_BY_HOST_ONLY","iconKey":"ok"},
					{"name":"-"},
					{"name":"INSERTMENU.DISABLE_LINKS_BY_HOST","iconKey":"error"},
				]
			},
			{
				"name":"SUBMENU_SEARCH",
				"iconKey":"search",
				"items":[
					{
						"actionData" : {"clazzName":"org.jdownloader.gui.views.components.packagetable.actions.SearchToolbarAction"},
						"name"       : "パッケージ検索...",
					},
					{
						"name":"OPEN_EVERYTHING_BY_AUTHOR",
						"iconKey":"search",
//						"shortcut"  :"pressed F3",
					},
					{
						"name":"OPEN_EVERYTHING_BY_TITLE",
						"iconKey":"search",
//						"shortcut"  :"pressed F4",
					},
					{"name":"-"},
					{"name":"OPEN_JD_CFG_FOLDER","iconKey":"folder"},
					{"name":"-"},
					{"name":"OPEN_SOURCEURL","iconKey":"browse"},
					{"name":"-"},
					{"name":"OPEN_LINK","iconKey":"browse"},
					{"name":"INSERTMENU.OPEN_LINKS_BY_HOST","iconKey":"plugin"},
				]
			},
			{
				"name":"SUBMENU_SEARCH_WEB",
				"iconKey":"browse",
				"items":[
					{"name":"INSERTMENU.SEARCH_WEB", "iconKey":"browse"},
				],
			}
		],
	},
	
	DEBUG:true,
// 【設定ここまで】
};



UserConfig.initConfig = function()
{
	// mapping SEARCH_WEB
	this.menuConfig.SEARCH_WEB = this.SEARCH_WEB;

	if (App.config.DEBUG)
	{
		// check path
		keys(this.path).forEach(function(k)
		{
			if (!this.path[k] || !getPath(this.path[k]).isFile())
				throw new TypeError("ERROR: Config.path."+k+" is not file path.");
		},this);
	
		// check priorityHostRule
		if (isArray(this.priorityHostRule))
			(this.priorityHostRule).forEach(function(k){
				if (! isRegExp(k))
					throw new TypeError("ERROR: Config.priorityHostRule, Not RegExp[] : "+k.toString());
			},this);
		else
			throw("ERROR: Config.priorityHostRule, Not Array.");
		
		// check SEARCH_WEB
		keys(this.SEARCH_WEB).forEach(function(k){
			const e = this.SEARCH_WEB[k];
			if (!keys(findBy).some(function(kk){return findBy[kk] === e[0]},this))
				throw new TypeError("ERROR: Config.SEARCH_WEB, Not findBy : "+v);
			if (e[1] != null && !/^https?:\/\/.+/.test(e[1]))
				throw new TypeError("ERROR: Config.SEARCH_WEB, Not URL or null: "+e[1]);
		},this);
	}
};

const LANGUAGE_JA      = 'ja';
const LANGUAGE_EN      = 'en';
const LANGUAGE_DEFAULT = LANGUAGE_EN;

const APIMethod={
	queryLinks:'queryLinks',
	addLinks:'addLinks',
	moveLinks:'moveLinks',
	movePackages:'movePackages',
	movetoNewPackage:'movetoNewPackage',
	moveToDownloadlist:'moveToDownloadlist',
	queryLinkCrawlerJobs:'queryLinkCrawlerJobs',
	startOnlineStatusCheck:'startOnlineStatusCheck',
	abort:'abort',
};

const API={
	moveLinks:        function(linkIds,afterLinkID,destPackageID){return callAPI(this.APIName,APIMethod.moveLinks,linkIds,afterLinkID,destPackageID)},
	movePackages:     function(packageIds,afterDestPackageId){return callAPI(this.APIName,APIMethod.movePackages,packageIds,afterDestPackageId)},
	movetoNewPackage: function(linkIds,pkgIds,newPkgName,downloadPath){return callAPI(this.APIName,APIMethod.movetoNewPackage,linkIds,pkgIds,newPkgName,downloadPath)},
	queryLinks:       function(queryParams){return callAPI(this.APIName,APIMethod.queryLinks,queryParams)},
	startOnlineStatusCheck:function(linkIds,packageIds){return callAPI(this.APIName,APIMethod.startOnlineStatusCheck,linkIds,packageIds)},

	addLinks:         function(query){return callAPI(this.APIName,APIMethod.addLinks,query)},
	moveToDownloadlist:function(linkIds,packageIds){return callAPI(this.APIName,APIMethod.moveToDownloadlist,linkIds,packageIds)},
	queryLinkCrawlerJobs:function(query){return callAPI(this.APIName,APIMethod.queryLinkCrawlerJobs,query)},
	abort:            function(jobId){return callAPI(this.APIName,APIMethod.abort,jobId)},
};


btnEvents.EVENT_DLC          = btnEvents.DOWNLOAD_TABLE_CONTEXT_MENU_BUTTON | btnEvents.DOWNLOAD_TABLE_BOTTOM_BAR_BUTTON;
btnEvents.EVENT_LGC          = btnEvents.LINKGRABBER_TABLE_CONTEXT_MENU_BUTTON | btnEvents.LINKGRABBER_BOTTOM_BAR_BUTTON;
btnEvents.EVENT_CONTEXT_MENU = btnEvents.DOWNLOAD_TABLE_CONTEXT_MENU_BUTTON | btnEvents.LINKGRABBER_TABLE_CONTEXT_MENU_BUTTON;
btnEvents.EVENT_BOTTOM_BAR_BUTTON = btnEvents.DOWNLOAD_TABLE_BOTTOM_BAR_BUTTON | btnEvents.LINKGRABBER_BOTTOM_BAR_BUTTON;
btnEvents.EVENT_DLC_AND_LGC  = btnEvents.EVENT_DLC | btnEvents.EVENT_LGC;
btnEvents.isDLC  = function(b){return 0!=((btnEvents[b]||0)&btnEvents.EVENT_DLC)};
btnEvents.isLGC  = function(b){return 0!=((btnEvents[b]||0)&btnEvents.EVENT_LGC)};
btnEvents.compare = function(b,ctx){return !!((btnEvents[ctx]||0)&b)}
btnEvents.isMenu = function(b){return 0!=((btnEvents[b]||0)&btnEvents.EVENT_CONTEXT_MENU)};
btnEvents.isBottomBar = function(b){return 0!=((btnEvents[b]||0)&btnEvents.EVENT_BOTTOM_BAR_BUTTON)};
btnEvents.isTestRun = function(b){return 0!=((btnEvents[b]||0)&btnEvents.TriggerName)};
/*
const menusV2 =
{
	LinkgrabberContext:"LinkgrabberContext",
	DownloadTableContext:"DownloadTableContext",
	LinkgrabberTabBottomBar:"LinkgrabberTabBottomBar",
	DownloadTabBottomBar:"DownloadTabBottomBar",
};
*/
const menusV2 =
{
	DLM:"DownloadTableContext",
	LGM:"LinkgrabberContext",
	DLB:"DownloadTabBottomBar",
	LGB:"LinkgrabberTabBottomBar",
	DLC:"DownloadTableContext",
	LGC:"LinkgrabberContext",
};
const LGC = menusV2.LGC;
const DLC = menusV2.DLC;




function simpleClone(obj)
{
	const newObj = (obj instanceof Array) ? [] : {};
	for (var prop in obj)
		newObj[prop] = (obj[prop] != null && typeof obj[prop] === 'object') ? simpleClone(obj[prop]) : obj[prop];
	return newObj;
}
// from https://github.com/jsPolyfill
Array.prototype.find = function(callback)
{
	if (this === null){
		throw new TypeError('Array.prototype.find called on null or undefined');
	}else if (typeof callback !== 'function'){
		throw new TypeError('callback must be a function');
	}
	var list = Object(this);
	var thisArg = arguments[1];
	var idx = list.findIndex(callback,thisArg);
	if (idx !== -1) return list[idx];
};

Array.prototype.findIndex = function(callback)
{
	if (this === null){
		throw new TypeError('Array.prototype.find called on null or undefined');
	}else if (typeof callback !== 'function'){
		throw new TypeError('callback must be a function');
	}
	var list = Object(this);
	var thisArg = arguments[1];
	var resultIndex = -1;
	list.some(function(el,i,li){if(callback.call(thisArg, el,i,li))return(resultIndex=i,1)});
	return resultIndex;
};

function getGlobalThis(){return this}
function zeroPadding(s,l){return((s.toString().length<l?'0'.repeat(l-s.toString().length):'')+s.toString())}
function DQ(s){	return '"'+ s.trim() +'"'}
function unDQ(s){return s.replace(/^[\s\xA0]*"?|"?[\s\xA0]*$/g, '')}
const keys = Object.keys;
function values(k){return keys(k).map(function(x){return k[x]})}
function isRegExp(x){return Object.prototype.toString.call(x) === '[object RegExp]'}
function isFunction(x){return typeof x === 'function'||x instanceof Function}
function isObject(x){return x!=null&&typeof x==='object'}
function isString(x){return typeof x === 'string'||x instanceof String}
const isArray = Array.isArray;
function T(s){return (s!=null)?s:''}
function defNoEnumProps(o,y){(isArray(o)?o:[o]).forEach(function(x){keys(y).forEach(function(z){Object.defineProperty(x,z,{enumerable:false,value:y[z]})})})};
function flatter(list)
{
	return list!=null ? (isArray(list)
		? list.reduce(function(res, x, i, li)
			{
				if (isArray(x))
					Array.prototype.push.apply(res, flatter(x));
				else
					li.hasOwnProperty(i) ? res.push(x) : res.length++;
				return res;
			},[])
		: [list]) : [];
}
function getFileParts(f)
{
	const r = T(f).match(/^(.+?)(\.part\d+|\.mp3|\.zip|\.rar|\.tar|\.epub)?(\.[\da-z]{2,6})$/i);
	return (r && !/^\d+$/.test(r[3]))?[T(r[1]),T(r[2]),T(r[3])]:[T(f),'',''];
}
function getFileSpec(f){return (getFileParts(f))[0]}
function getFileSpecFull(f){const x=getFileParts(f);return x[0]+x[1];}
function getExt(f){return (getFileParts(f))[2]}
function getExtFull(f){const x=getFileParts(f);return x[1]+x[2];}

function getxUrl(l){return l.pluginURL||l.contentURL||l.getProperty('URL_CONTENT')||''}
function getxUrl2(l){return getxUrl(l).replace(/#.*$/,'')}
//function getxUrl(x){return x.getUrl()||''}
function xUUID(x){return x.UUID}
function xName(x){return x.getName()}
function xDup(x,i,l){return l.indexOf(x)===i}
function isJavaObject(obj){return obj!=null && '[object JavaObject]' === Object.prototype.toString.call(obj)}
function isJdObject(obj,sign)
{
	return isJavaObject(obj) && (obj.toString()||'').indexOf(sign)===0
}
function isCrawledLink(obj){return isJdObject(obj, 'CrawledLink Instance:')}
function isCrawledPackage(obj){return isJdObject(obj, 'CrawledPackage Instance:')}
function isDownloadLink(obj){return isJdObject(obj, 'DownloadLink Instance:')}
function isFilePackage(obj){return isJdObject(obj, 'FilePackage Instance:')}
function isDownloadPackage(obj){return isFilePackage(obj)}
function isLinkgrabberSelection(obj){return isJdObject(obj, 'org.jdownloader.extensions.eventscripter.sandboxobjects.LinkgrabberSelectionSandbox@')}
function isDownloadSelection(obj){return isJdObject(obj, 'org.jdownloader.extensions.eventscripter.sandboxobjects.DownloadlistSelectionSandbox@')}
function isCrawlerJob(obj){return isJdObject(obj, 'org.jdownloader.extensions.eventscripter.sandboxobjects.CrawlerJobSandbox@')}


function jdPath(path)
{ 
	const sep = getPathSeparator();
	if (sep == '\\')
		path = path.replace('/', '\\');
	else if (sep == '/')
		path = path.replace('\\', '/');
	return JD_HOME+sep+path;
}

/*
function jdFormatString(str, replacers)
{
	return str.replace(/%s(\d)/g,function(m,n){return --n<replacers.length?replacers[n]:m})
		.replace(/\\([\\"nrt])/g, function(m,m1){return {'\\':'\\','"':'"','n':'\n','r':'\r','t':'\t'}[m1]});	//"
}

*/

function jdFormatString(str, replacers)
{
	var rep = flatter(replacers);
	const max = rep.length;
	const sp = {'\\':'\\','"':'"','n':'\n','r':'\r','t':'\t'};

	var tmp = str;
	var len = tmp.length;
	var output = [];
	// replace special char
	for (var cur=0,pos=0; cur<len; cur=pos)
	{
		pos = tmp.indexOf("\\", cur);
		if (pos == -1) pos = len;
		output.push(tmp.substr(cur,pos-cur));
		if (len < (++pos)) break;
		output.push(sp[tmp[pos]]||tmp[pos]);
		pos++;
	}

	tmp = output.join('');
	len = tmp.length;
	output=[];
	// replace format words with replacers
	var idx=0;
	for (var cur=0,pos=0; cur<len; cur=pos)
	{
		pos = tmp.indexOf("%s", cur);
		if (pos == -1) pos = len;
		output.push(tmp.substr(cur,pos-cur));
		if (len < (pos+=2)) break;
		idx = parseInt(tmp[pos++])-1;
		if (0<=idx && idx<max) output.push(rep[idx]||'');
	}
	tmp = output.join('');
	
	return tmp;
}

/**
 * 文字列の正規化
 *
 * @param   {string} s 変換前の文字列
 * @returns {string} 変換後の文字列
 *
 * ES5環境にはString.prototype.normalize()が無い
 */
function normalizeTitle(s)
{
	if (s===undefined||s===null||s==="") return s;
	
	/** @type {object.<string:string>} 半角記号の変換テーブル */
	const NT1 = {
"\!":"！","\"":"”","\$":"＄","\%":"％","\&":"＆","'":"’","~":"￣","|":"｜",
"*":"＊",":":"：","<":"＜",">":"＞","?":"？","/":"／","\\":"￥","`":"‘",",":"，"
//特殊濁点半濁点→日本語濁点半濁点（分離）
//"\u3099":"\u309B","\u309A":"\u309C"
	};
	/** @type {object.<string:string>}} 文字列の変換テーブル */
	const NT2 = {
//記号
"　":" ","〜":"～","&times;":"＋","&amp;":"＆","♡":"","♥":"","―":"－","─":"－","━":"－",

//半角カナ→全角カナ
'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
'｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・',
//よくある簡体字、繁体字→日本語常用漢字
'卷':'巻','學':'学','黑':'黒','關':'関','繪':'絵','會':'会','亞':'亜','髙':'高','户':'戸',
'說':'説','说':'説'		//繁体字、簡体字の"説"
	};
	
	/** @type {object.<string:string>} 濁点半濁点結合 */
	const NT3={
'ウ゛':'ヴ','ワ゛':'ヷ','ヲ゛':'ヺ',
'カ゛':'ガ','キ゛':'ギ','ク゛':'グ','ケ゛':'ゲ','コ゛':'ゴ',
'サ゛':'ザ','シ゛':'ジ','ス゛':'ズ','セ゛':'ゼ','ソ゛':'ゾ',
'タ゛':'ダ','チ゛':'ヂ','ツ゛':'ヅ','テ゛':'デ','ト゛':'ド',
'ハ゛':'バ','ヒ゛':'ビ','フ゛':'ブ','ヘ゛':'ベ','ホ゛':'ボ',
'ハ゜':'パ','ヒ゜':'ピ','フ゜':'プ','ヘ゜':'ペ','ホ゜':'ポ',
'か゛':'が','き゛':'ぎ','く゛':'ぐ','け゛':'げ','こ゛':'ご',
'さ゛':'ざ','し゛':'じ','す゛':'ず','せ゛':'ぜ','そ゛':'ぞ',
'た゛':'だ','ち゛':'ぢ','つ゛':'づ','て゛':'で','と゛':'ど',
'は゛':'ば','ひ゛':'び','ふ゛':'ぶ','へ゛':'べ','ほ゛':'ぼ',
'は゜':'ぱ','ひ゜':'ぴ','ふ゜':'ぷ','へ゜':'ぺ','ほ゜':'ぽ',
	};
//	var pat1=new RegExp('(?:['+Object.keys(NT1).map(c=>'\\'+c).join('')+']', 'g');
//	alert('(?:['+Object.keys(NT1).join('')+']');

	const pat1=new RegExp('['+keys(NT1).join('')+']', 'g');
	const pat2=new RegExp('(?:' + keys(NT2).join('|') + ')', 'g');
//	const pat3=new RegExp('(['+Object.keys(NT3).map(function(s){return s[0]}).join('')+'])([\u3099\u309B\u309A\u309C])', 'g');
	const pat3=/([ウワヲカキクケコサシスセソタチツテトハヒフヘホうかきくけこさしすせそたちつてとはひふへほ])([\u3099\u309B\u309A\u309C])/g;
	return( s
			.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)})
			.replace(pat1,function(m){return(m in NT1?NT1[m]:m)})
			.replace(pat2,function(m){return(m in NT2?NT2[m]:m)})
			.replace(pat3,function(m,s1,s2){var x=s1+{'\u3099':'\u309B','\u309B':'\u309B','\u309A':'\u309C','\u309C':'\u309C'}[s2];return(x in NT3?NT3[x]:x)})
			.replace(/([\]\)])([^\s\.])/g, '$1 $2')
			.replace(/([^ ])([\[\(])/g, '$1 $2')
			.replace(/  +/g," ")
		);
}

function getDefaultDownloadFolder()
{
	return callAPI("config", "get", "org.jdownloader.settings.GeneralSettings", null, "DefaultDownloadFolder");
}

/**
 * パッケージ上で右クリックしたのなら選択中のパッケージリストを
 *     リンク上で右クリックしたのなら選択中のリンクリストを返す
 * 
 * @function
 * @param   {object} sel lgSelection or dlSelection
 * @returns {object[]}   packages or links or []
 */
function getItemsByContextType(sel)
{
	return (sel.isPackageContext() ? sel.packages : (sel.isLinkContext() ? sel.links : []));
}

/**
 * 右クリックされたパッケージかリンクを返す
 * 
 * @param   {object} sel  lgSelection or dlSelection
 * @returns {object|null} package or link or null
 */
function getContextItemByContextType(sel)
{
	return (sel.isPackageContext() ? sel.contextPackage : (sel.isLinkContext() ? sel.contextLink : null));
}



// "Script" が使えない(´・ω・｀)
const App = {
	config:UserConfig,
	translation:null,
	resource:null,
	dispatcher:null,
};

//App.config = UserConfig;

App.jdFormat = function(fmt, rep)
{
	return jdFormatString(this.getResource(fmt), rep!=null?(isArray(rep)?rep:[rep]).map(function(r){return this.getResource(r)},this):undefined);
};
/** 
 * JDの言語ファイル関連
 *
 *   JD_UISetting_Language = translation.language;
 *   translation.isAutoCreatedPackageName(package_name)
 *   translation.isDefaultPackageName(package_name)
 *
 * 今のところ、取り扱いは以下の３ファイル
 *   cfg/language.json
 *   translations/org/jdownloader/translate/JdownloaderTranslation.*.lng
 *   translations/org/jdownloader/gui/translate/GuiTranslation.*.lng
 */
App.translation = 
{
	SEPARATOR                       : 'SeparatorData_SeparatorData',					// セパレータ
	VARIOUS_PACKAGE                 : 'LinkCollector_addCrawledLink_variouspackage',	// 様々なファイル
	DEFAULT_PACKAGE                 : 'controller_packages_defaultname',				// 任意
	OFFLINE_PACKAGE                 : 'LinkCollector_addCrawledLink_offlinepackage',	// オフラインファイル
	PERMANENTLY_OFFLINE_PACKAGE     : 'Permanently_Offline_Package',					// 永続オフライン
	HEXLOAD_PACKAGE                 : 'Folder',											// hexload.com plugin
	PATH_CFG_LANGUAGE_JSON          : 'cfg\\language.json',
	PATH_TRANSLATION_GUITRANSLATE   : 'translations\\org\\jdownloader\\gui\\translate',
	PATH_TRANSLATION_TRANSLATE      : 'translations\\org\\jdownloader\\translate',
	PREFIX_TRANSLATION_GUITRANSLATE : 'GuiTranslation',
	PREFIX_TRANSLATION_TRANSLATE    : 'JdownloaderTranslation',
	EXTENTION_LNG_FILE              : '.lng',
	
	/**
	 * JDのlanguageを取得(JD本体側の「UI設定の言語」)
	 * 
	 * @return {string='en'}
	 *
	 * 返すlanguage文字列は[-a-zA-Z\d_]+の範囲内の文字列（"en"|"ja"|etc...）
	 * デフォルトは en
	 *
	 * ファイル'cfg\\language.json'から取得
	 * この文字列はJDをリスタートするまで不変
	 * 値はキャッシュする
	 */
	_language : null,
	get language() {
	
//	return LANGUAGE_EN;				// for DEBUG english lang

			if (this._language) return this._language;
			const buf = unDQ(readFile(jdPath(this.PATH_CFG_LANGUAGE_JSON)));
			return this._language = (buf != '' && /^[-a-zA-Z\d_]+$/.test(buf)) ? buf : 'en';
	},
	
	/**
	 * JDの言語ファイル(*.lng)を読み込み変換テーブルを取得
	 * ファイル毎の最小限のキャッシュを生成（ファイル全体のデータは破棄し、指定したキーのみキャッシュ）
	 *
	 * @param {string} path_lng 取得する言語ファイルへのパス
	 * @param {string[]|string} filter_keys 取得する文字列を指定するキーorキー配列、引数無しで全取得
	 * @return {TranslateResourceTable|null} 指定した言語ファイルから取得した文字列変換テーブル
	 * -@return {object.<string,string>|null}
	 *
	 * ※中身が/(key:[^=\s]+)=(value:[^\n]*)\n/のファイルを読む関数
	 *
	 */
	getTranlation : function(path_lng, filter_keys)
	{
		if (! this.getTranlation.cache) this.getTranlation.cache = {};
		
		const ret = {};
		if (filter_keys)
		{
			if (!isArray(filter_keys))
			{
				if (typeof filter_keys !== 'string')
					return null;
				
				filter_keys = [filter_keys];
			}
			
			if (this.getTranlation.cache[path_lng])
			{
				filter_keys = filter_keys.filter(function(k)
				{
					if (! (this.getTranlation.cache[path_lng][k]) )
						return true;
					
					ret[k] = this.getTranlation.cache[path_lng][k];
					return false;
				}, this);
				if (keys(filter_keys).length == 0)
					return ret;
			}
		}
		const buf = readFile(path_lng);
		if (! buf) return null;
		if (! this.getTranlation.cache[path_lng]) this.getTranlation.cache[path_lng] = {};
		
		const _cache = this.getTranlation.cache[path_lng];
		if (! filter_keys)
			buf.replace(/([^=\r\n]+)=([^\r\n]*)/g,function(line,k,v){_cache[k]=ret[k]=v});
		else if (isArray(filter_keys))
			buf.replace(/([^=\r\n]+)=([^\r\n]*)/g,function(line,k,v){if(0<filter_keys.filter(function(a){return a==k}).length)_cache[k]=ret[k]=v});
		else if (typeof filter_keys === 'string')
			buf.replace(/([^=\r\n]+)=([^\r\n]*)/g,function(line,k,v){if(filter_keys==k)_cache=ret[k]=v});
		return ret;
	},
	
	_getJdownloaderTranslationXLngPath : function(lng){
		return jdPath(this.PATH_TRANSLATION_TRANSLATE+'\\'+this.PREFIX_TRANSLATION_TRANSLATE+'.'+(lng||this.language)+this.EXTENTION_LNG_FILE)
	},
	_getGuiTranslationXLngPath : function(lng){
		return jdPath(this.PATH_TRANSLATION_GUITRANSLATE+'\\'+this.PREFIX_TRANSLATION_GUITRANSLATE+'.'+(lng||this.language)+this.EXTENTION_LNG_FILE)
	},
	
	/**
	 * JDの言語ファイル JdownloaderTranslation.{language}.lngを読み込んで変換テーブルを取得
	 * ファイル毎の最小限のキャッシュを生成（ファイル全体のデータは破棄し、指定したキーのみキャッシュ）
	 *
	 * @param {string[]|string} filter_keys 取得したいキーorキー配列、引数無しで全取得
	 * @param {string=this.language} lang 言語の指定（デフォルトは「JDのUI設定の言語」）
	 * @return {object.<string,string>|null} 指定した言語ファイルから取得した文字列変換テーブル
	 */
	getJdownloaderTranslation : function(filter_keys, lang){
		return this.getTranlation(this._getJdownloaderTranslationXLngPath(lang||this.language), filter_keys)
	},
	/**
	 * JDの言語ファイル GuiTranslation.{language}.lngを読み込んで変換テーブルを取得
	 * ファイル毎の最小限のキャッシュを生成（ファイル全体のデータは破棄し、指定したキーのみキャッシュ）
	 *
	 * @param {string[]|string} filter_keys 取得したいキーorキー配列、引数無しで全取得
	 * @param {string=this.language} lang 言語の指定（デフォルトは「JDのUI設定の言語」）
	 * @return {object.<string,string>|null} 指定した言語ファイルから取得した文字列変換テーブル
	 */
	getGuiTranslation : function(filter_keys, lang){
		return this.getTranlation(this._getGuiTranslationXLngPath(lang||this.language), filter_keys)
	},
	
	/**
	 * 自動生成されたパッケージ名かどうか判定（英語＋現在の言語、２言語分チェック）
	 *
	 * @param {string} n パッケージ名
	 * @return {boolean}
	 *
	 * JDownloaderの言語パッケージから翻訳データを取得しないと判別できない
	 * Translationインターフェースの使い方が分からんから
	 * .lngファイルから直読み
	 *
	 **/
	isAutoCreatedPackageName : function(n)
	{
		const langs = [this.language];
		if (langs[0] != LANGUAGE_DEFAULT) langs.push(LANGUAGE_DEFAULT);
		return langs.some(function(l)
		{
			const tmp1 = this.getJdownloaderTranslation([this.VARIOUS_PACKAGE, this.DEFAULT_PACKAGE, this.OFFLINE_PACKAGE], l);
			const tmp2 = this.getGuiTranslation([this.PERMANENTLY_OFFLINE_PACKAGE], l);
			
			return n===tmp1[this.VARIOUS_PACKAGE]
				|| n===tmp1[this.DEFAULT_PACKAGE]
				|| n===tmp1[this.OFFLINE_PACKAGE]
				|| n===tmp2[this.PERMANENTLY_OFFLINE_PACKAGE];
		},this);
	},
	
	getSeparatorName : function(lang)
	{
		var tmp = this.getGuiTranslation([this.SEPARATOR], lang);
		if (!tmp[this.SEPARATOR])
		{
			// fall back
			tmp = this.getGuiTranslation([this.SEPARATOR], LANGUAGE_DEFAULT);
			if (!tmp[this.SEPARATOR])
			{
				return null;
			}
		}
		return tmp[this.SEPARATOR];
	},

	/**
	 * デフォルトのパッケージ名かどうか判定（英語＋現在の言語、２言語分チェック）
	 *
	 * @param {string} n パッケージ名
	 * @return {boolean}
	 **/
	isDefaultPackageName : function(n)
	{
		const langs = [this.language];
		if (langs[0] != LANGUAGE_DEFAULT) langs.push(LANGUAGE_DEFAULT);
		return langs.some(function(l)
		{
			const tmp = this.getJdownloaderTranslation([this.VARIOUS_PACKAGE, this.DEFAULT_PACKAGE], l);
			return n===tmp[this.VARIOUS_PACKAGE]
				|| n===tmp[this.DEFAULT_PACKAGE];
		},this);
	},
};

App.isAutoCreatedPackageName = function(n){return this.translation.isAutoCreatedPackageName(n)};
App.isDefaultPackageName     = function(n){return this.translation.isDefaultPackageName(n)};
App.getResource = function(id, lang){return this.resource.getResource(id, lang||this.script_language)};
App.isDLC              = function(){return btnEvents.isDLC(this.menu)};
App.isLGC              = function(){return btnEvents.isLGC(this.menu)};
App.getSelection       = function(){return this.CTX.selection};
App.checkEventSource   = function(allowedEvents){return btnEvents[this.menu]&&0!=(btnEvents[this.menu]&allowedEvents)};
App.initResourceTables = function()
{
	var r = {
		// 日本語
		'ja':
		{
			OPEN_EVERYTHING_BY_TITLE					: 'Everythingで検索(タイトル)',
			OPEN_EVERYTHING_BY_AUTHOR					: 'Everythingで検索(作者名)',
			OPEN_LINK									: 'ブラウザで開く',
			OPEN_JD_CFG_FOLDER							: 'JDバックアップフォルダを開く',
			OPEN_SOURCEURL								: '登録元ページを開く',
			// リネーム系
			RENAME_LINKS_BY_PACKAGENAME					: 'パッケージ名で名前を揃える',
			RENAME_PACKAGE_AND_LINKS_BY_CONTEXTLINKNAME	: 'このリンクの名前でパッケージ内を全て揃える',
			RENAME_LINK_BY_LINKNAME						: '名前を揃える',		// 複数のリンクを選択してから右クリックし、右クリック直下のファイル名 (○○) [△△] □□.zip→(○○) [△△] □□を揃える
			RENAME_LINK_BY_LINK_AUTHOR					: '名前を揃える(作者名)',	// (○○) [△△] □□.zip→[△△]部を揃える
			RENAME_LINK_BY_LINK_TITLE					: '名前を揃える(タイトル)',	// (○○) [△△] □□ ～××～第01巻.zip→□□部を揃える
			RENAME_LINK_BY_LINK_CATEGORY_AUTHOR			: '名前を揃える(カテゴリ+作者名)',
			RENAME_LINK_BY_LINK_LONGTITLE				: '名前を揃える(カテゴリ+作者名+タイトル)',
			RENAME_STARTING_BRACKETS_MOVETO_END			: '先頭括弧を後方送り',
			RENAME_REMOVE_TRAILING_BRACKETS				: '末尾の括弧削除',
			RENAME_NUMBERING_FORMAT						: '第○○巻化',
			RENAME_AUTHOR_SWAP							: '[]内のスワップ',	// [○○×△△]→[△△×○○]
			RENAME_AUTHOR_CHOP							: '[]内の末尾切り捨て',	// [○○×△△×□□]→[○○×△△]
			RENAME_AUTHOR_X_TO_BATSU					: '[]内のxを×に変換',	// [○○x△△]→[○○×△△]
			RENAME_TO_PACKAGIZER_NAME					: '名前を元に戻す(パッケージャ適用後)...',
			RENAME_TO_ORIGIN_NAME						: '名前を元に戻す...',
			RENAME_ALIGN_DIGITS_LENGTH					: '名前の数字の桁揃え',
			RENAME_FULLWIDTH_TO_HALFWIDTH				: '名前の全角英数字を半角に変換',
			RENAME_NORMALIZE							: '名前の正規化',
			RENAME_URLDECODE							: '名前のURLデコード',
			// 移動系
			MOVETO_NEWPACKAGE_WITH_FILENAME				: 'この名前で新しいパッケージに移動',
			MOVE_SAMENAME_PACKAGES_TO_PACKAGE			: '同じ名前のパッケージをまとめる',
			ADD_LINKS_TO_LINKGRABBER					: 'リンクグラバーへ再登録',

			SORT_PACKAGES_BY_TITLE_ASCENDING			: 'タイトルで並べ替え(昇順)',
			SORT_PACKAGES_BY_TITLE_DESCENDING			: 'タイトルで並べ替え(降順)',
			SORT_PACKAGES_BY_AUTHOR_ASCENDING			: '作者名で並べ替え(昇順)',
			SORT_PACKAGES_BY_AUTHOR_DESCENDING			: '作者名で並べ替え(降順)',
			SORT_PACKAGES_BY_CATEGORY_TITLE_ASCENDING	: 'カテゴリ別タイトルで並べ替え(昇順)',
			SORT_PACKAGES_BY_CATEGORY_TITLE_DESCENDING	: 'カテゴリ別タイトルで並べ替え(降順)',
			SORT_PACKAGES_BY_CATEGORY_AUTHOR_ASCENDING	: 'カテゴリ別作者名で並べ替え(昇順)',
			SORT_PACKAGES_BY_CATEGORY_AUTHOR_DESCENDING	: 'カテゴリ別作者名で並べ替え(降順)',
			SORT_PACKAGES_BY_ADDEDDATE_ASCENDING		: '追加日時で並べ替え(昇順)',
			SORT_PACKAGES_BY_ADDEDDATE_DESCENDING		: '追加日時で並べ替え(降順)',
			SORT_PACKAGES_BY_MYRULE_ASCENDING			: '優先ホストで並べ替え(昇順)', 
			SORT_PACKAGES_BY_MYRULE_DESCENDING			: '優先ホストで並べ替え(降順)',
			
			ENABLE_LINKS_MYRULE_SINGLE					: '優先ホスト(単一)のみ有効',
			ENABLE_LINKS_MYRULE_MULTIPLE				: '優先ホスト(複数)のみ有効',
			
			RENAME_ADD_TO_BEGIN_REGEXP					: /^(.+) *>>$/,
			RENAME_ADD_TO_END_REGEXP					: /^<< *(.+)$/,
			ENABLE_LINKS_BY_HOST_ONLY_REGEXP			: /^([\da-z][-\da-zA-Z\.]+) *のみ有効$/,
			DISABLE_LINKS_BY_HOST_REGEXP				: /^([\da-z][-\da-zA-Z\.]+) *を無効$/,
			OPEN_LINKS_BY_HOST_REGEXP					: /^([-\da-zA-Z\.]+\.[\da-z]{2,4}) *のみ開く/,
			
			RENAME_ADD_TO_BEGIN							: '%s1 >>',
			RENAME_ADD_TO_END							: '<< %s1',
			ENABLE_LINKS_BY_HOST_ONLY					: '%s1 のみ有効',
			DISABLE_LINKS_BY_HOST						: '%s1 を無効',
			OPEN_LINKS_BY_HOST							: '%s1 のみ開く',
			SEARCH_WEB									: '%s1',

			SUBMENU_RENAME_ALIGN						: 'リネーム - 名前を揃える',
			SUBMENU_RENAME_ADD_REPLACE					: 'リネーム - 追加/置換',
			SUBMENU_ENABLE_DISABLE						: '有効/無効',
			SUBMENU_SORT								: '並べ替え',
			SUBMENU_MOVE_FILE_BROWSE					: '移動/登録',
			SUBMENU_SEARCH_WEB							: 'WEB検索',
			SUBMENU_SEARCH								: '開く/検索/その他',
			
			SEARCH_GOOGLE_AUTHOR		: 'google.com (作者)',
			SEARCH_GOOGLE_TITLE			: 'google.com (タイトル)',
			MERGETOPACKAGEACTION		: '新しいパッケージへ移動...',
			MOVETODOWNLOAD				: 'ダウンロードに追加',
			MOVETODOWNLOADANDSTART		: 'ダウンロードに追加して開始',
			MOVETODOWNLOADANDFORCESTART	: 'ダウンロードに追加して強制的に開始',
			MOVETODOWNLOADAFTERCONFIRM	: 'ダウンロードに追加...',
			ADDATTOPTOGGLEACTION		: 'ダウンロード追加時の位置を最上部に設定',
			
			DownloadTableContext	: "ダウンロードリスト - 右クリックメニュー",
			LinkgrabberContext		: "リンクグラバーリスト - 右クリックメニュー",
//			DownloadTabBottomBar	: "ダウンロードリスト下部バー",
//			LinkgrabberTabBottomBar	: "リンクグラバー下部バー",

			SEPERATOR:
				'セパレータ',
			INSTALLMENU_MESSAGE:
				'────────────────────────────\n'+
				'　　　　　　右クリックメニューのインストール　　　　　　\n'+
				'────────────────────────────\n\n'+
				'%s1\n'+
				'────────────────────────────\n'+
				'%s2',
			INSTALLMENU_INTRO:
				'右クリックメニューに項目を追加します\n\n'+
				'　・リンクグラバー - 右クリックメニュー\n'+
				'　・ダウンロードリスト - 右クリックメニュー\n\n'+
				'【注意】\n'+
				'・追加されたメニューの項目は、\n'+
				'　後から『 メニュー管理画面 』で編集が可能\n'+
				'・インストール前に各メニューのバックアップファイルを作成\n'+
				'・バックアップしたファイルは『 メニュー管理画面 』から\n'+
				'　インポートすることで、以前の状態に復元可能\n'+
				'\n'+
				'（『 次へ... 』ボタンを押すと開始され、最後まで進むと\n'+
				'『 インストールを実行 』します）',
			INSTALLMENU_LANG:
				'\nインストールするメニューの言語を選択してください\n\n',
			INSTALLMENU_MENU:
				'『 %s1 』に\n\nメニューを追加しますか？\n\n\n'+
				'※　現在使用されているメニューのバックアップは\n'+
				'JDの /cfg/ フォルダに保存されます',
			INSTALLMENU_EXECUTE:
				'以下のメニューの『バックアップファイルを作成』した後、\n'+
				'『 インストールを実行 』 します\n\n'+
				'よろしいですか？\n\n\n'+
				'%s1\n'+
				'※　後から『 メニュー管理画面 』で保存されたバックアップファイルを\n'+
				'　　インポートすることにより、メニューを以前の状態に復元できます。',
			INSTALLMENU_EBACKUP:
				'ERROR: バックアップファイルの作成に失敗しました\n\n'+
				'バックアップ無しでインストールを継続しますか？\n\n\n'+
				'%s1',
			INSTALLMENU_RESTART:
				'インストールが完了しました\n\n'+
				'設定の反映には『 JDownloaderの再起動 』が必要です\n'+
				'今すぐJDownloaderを再起動しますか？\n\n\n'+
				'%s1',
			INSTALLMENU_DONE:
				'インストールが完了しました\n'+
				'終了します\n\n\n'+
				'%s1',
			INSTALLMENU_CANCEL:
				'インストールがキャンセルされました\n'+
				'終了します\n',
			INSTALLMENU_BACKUP_DONE:
				'バックアップ済み',
			INSTALLMENU_BACKUP_NO:
				'バックアップ前',
			INSTALLMENU_BACKUP_ERROR:
				'バックアップ失敗',
			INSTALLMENU_INSTALL_DONE:
				'完了',
			INSTALLMENU_INSTALL_NO:
				'未インストール',
			INSTALLMENU_INSTALL_ERROR:
				'失敗',
			INSTALLMENU_RESULT:
				'【　　メニュー種別】『%s1 (%s2)』\n'+
				'【インストール進捗】%s3\n'+
				'【バックアップ進捗】%s4\n'+
				'【　バックアップ先】"%s5"',
			INSTALLMENU_INDICATOR_1:
				'→',
			INSTALLMENU_INDICATOR_2:
				'　',
			INSTALLMENU_INDICATOR_MSG:
				'・インストールモードの開始確認\n'+
				'・インストールする右クリックメニューの言語選択\n'+
				'・インストールする右クリックメニューの選択\n'+
				'・インストールの実行\n'+
				'・終了',
			JA:
				'日本語',
			EN:
				'英語',
			NEXT:
				'次へ...',
			CLOSE:
				'閉じる',
			GOTO_START:
				'最初に戻る...',
			CONTINUE:
				'続行',
			ABORT:
				'中止',
			YES:
				'はい',
			NO:
				'いいえ',
			OK:
				'OK',
			CANCEL:
				'キャンセル',
			INSTALL:
				'インストール実行',
			RESTART_NOW:
				'今すぐ再起動',
			TO_LATER:
				'後にする･･･',
			RENAME_TO_ORIGIN_NAME_MSG:
				'【%s1】\n\n'+
				'選択されているリンクの名前を元に戻します\n'+
				'よろしいですか？\n'+
				'\n'+
				'──────────────────────────\n%s2\n\n',
			RENAME_TO_ORIGIN_NAME_ITEM:
				'"%s1" →\n"%s2"',
			RENAME_TO_ORIGIN_NAME_ITEM_SAME:
				'"%s1" →\n   >>>【同名のためスキップします】',
			RENAME_LINKS_BY_MSG:
				'【%s1】\r\nパッケージ "%s2"：リンクに非対応の拡張子が含まれています\r\n\r\nこのパッケージをリネームしますか？',
			CONFIRM_OPEN_BROWSER_WITH_TOO_MANY_URLS:
				'%s1 個の検索用URLをブラウザで開こうとしています。\n\n本当に実行しますか？',
			ADDLINKTOLINKGRABBER_TIMEOUT:
				'リンクグラバーへの再登録でタイムアウトになりましたので、この処理を中断します',
			ADDLINKSTOLINKGRABBER_IGNORE_DUP_URL:
				'再登録するリンクに同一URLが複数あります\n重複したURLを持つリンクは最初のものだけ再登録されます\n\nこのまま処理を続行しますか？',
			ERROR_INVALID_TRIGGER_TYPE:
				'イベントトリガーのタイプが正しく設定されていません\n\n'+
				'解決方法：イベントスクリプトの設定から本スクリプトのトリガーに\n'+
				'　　　　　【ダウンロードリストコンテキストメニュー選択時】か、\n'+
				'　　　　　【リンクグラバーコンテキストメニュー選択時】を選択し、\n'+
				'　　　　　リストビュー画面の右クリックのコンテキストメニューから実行してください\n',
			ERROR_INVALID_VALUE_IN_DISPATCHE_TABLE:
				'initDispatchTable()でのディスパッチデーブルで指定されたApp.*メソッドが見つかりません。\n\t%s1:%s2',
		},
		
		// Don't erase 'en'...
		// 英語
		'en':
		{
			OPEN_EVERYTHING_BY_TITLE					: 'Everything(Title)',
			OPEN_EVERYTHING_BY_AUTHOR					: 'Everything(Author)',
			OPEN_LINK									: 'Open browser',
			
			OPEN_JD_CFG_FOLDER							: 'Open JD Backup Folder',
			OPEN_SOURCEURL								: 'Open the Source Page',
			
			RENAME_LINKS_BY_PACKAGENAME					: 'Rename links to package name',
			RENAME_PACKAGE_AND_LINKS_BY_CONTEXTLINKNAME	: 'Rename package and links to this link name',

			RENAME_LINK_BY_LINKNAME						: 'Rename links to this link name',		// 複数のリンクを選択してから右クリックし、右クリック直下のファイル名 (○○) [△△] □□.zip→(○○) [△△] □□を揃える
			RENAME_LINK_BY_LINK_AUTHOR					: 'Rename links to this link name(Author)',	// (○○) [△△] □□.zip→[△△]部を揃える
			RENAME_LINK_BY_LINK_TITLE					: 'Rename links to this link name(Title)',	// (○○) [△△] □□ ～××～第01巻.zip→□□部を揃える
			RENAME_LINK_BY_LINK_CATEGORY_AUTHOR			: 'Rename links to this link name(Category+Author)',
			RENAME_LINK_BY_LINK_LONGTITLE				: 'Rename links to this link name(Category+Author+Title)',

			RENAME_STARTING_BRACKETS_MOVETO_END			: 'Rename to move starting brackets to end',
			RENAME_REMOVE_TRAILING_BRACKETS				: 'Rename to remove trailed brackets',
			RENAME_NUMBERING_FORMAT						: 'Rename Numbering to comic format',
			RENAME_FULLWIDTH_TO_HALFWIDTH				: 'Rename Full-width characters to Half',
			RENAME_NORMALIZE							: 'Rename Normalize',
			RENAME_URLDECODE							: 'Rename URL-Decode',


			RENAME_AUTHOR_SWAP							: 'Rename Author - swap',	// [○○×△△]→[△△×○○]
			RENAME_AUTHOR_CHOP							: 'Rename Author - chop last author',	// [○○×△△×□□]→[○○×△△]
			RENAME_AUTHOR_X_TO_BATSU					: 'Rename Author - x to ×',	// [○○x△△]→[○○×△△]

			RENAME_TO_PACKAGIZER_NAME					: 'Revert to original name (Packager applied)...',
			RENAME_TO_ORIGIN_NAME						: 'Revert to original name...',
			RENAME_ALIGN_DIGITS_LENGTH					: 'Rename links to align the digits length',
			
			MOVETO_NEWPACKAGE_WITH_FILENAME				: 'Move to new package with this name',
			MOVE_SAMENAME_PACKAGES_TO_PACKAGE			: 'Merge same packages',
			ADD_LINKS_TO_LINKGRABBER					: 'Add to LinkGrabber',

			SORT_PACKAGES_BY_TITLE_ASCENDING			: 'Sort packages by Title(ASC)',
			SORT_PACKAGES_BY_TITLE_DESCENDING			: 'Sort packages by Title(DESC)',
			SORT_PACKAGES_BY_AUTHOR_ASCENDING			: 'Sort packages by Author(ASC)',
			SORT_PACKAGES_BY_AUTHOR_DESCENDING			: 'Sort packages by Author(DESC)',
			SORT_PACKAGES_BY_CATEGORY_TITLE_ASCENDING	: 'Sort packages by Category Title(ASC)',
			SORT_PACKAGES_BY_CATEGORY_TITLE_DESCENDING	: 'Sort packages by Category Title(DESC)',
			SORT_PACKAGES_BY_CATEGORY_AUTHOR_ASCENDING	: 'Sort packages by Category Author(ASC)',
			SORT_PACKAGES_BY_CATEGORY_AUTHOR_DESCENDING	: 'Sort packages by Category Author(DESC)',
			SORT_PACKAGES_BY_ADDEDDATE_ASCENDING		: 'Sort packages by Added Date(ASC)',
			SORT_PACKAGES_BY_ADDEDDATE_DESCENDING		: 'Sort packages by Added Date(DESC)',
			SORT_PACKAGES_BY_MYRULE_ASCENDING			: 'Sort packages by my Rules(ASC)', 
			SORT_PACKAGES_BY_MYRULE_DESCENDING			: 'Sort packages by my Rules(DESC)',

			ENABLE_LINKS_MYRULE_SINGLE					: 'Enable links matched my Rules only (Single)',
			ENABLE_LINKS_MYRULE_MULTIPLE				: 'Enable links matched my Rules only (Multiple)',

			RENAME_ADD_TO_BEGIN_REGEXP					: /^(.+) *>>$/,
			RENAME_ADD_TO_END_REGEXP					: /^<< *(.+)$/,
			ENABLE_LINKS_BY_HOST_ONLY_REGEXP			: /^Enable only *([-\da-zA-Z\.]+\.[\da-z]{2,4})$/,
			DISABLE_LINKS_BY_HOST_REGEXP				: /^Disable *([-\da-zA-Z\.]+\.[\da-z]{2,4})$/,
			OPEN_LINKS_BY_HOST_REGEXP					: /^Open browser *- *([-\da-zA-Z\.]+\.[\da-z]{2,4})$/,
			RENAME_ADD_TO_BEGIN							: '%s1 >>',
			RENAME_ADD_TO_END							: '<< %s1',
			ENABLE_LINKS_BY_HOST_ONLY					: 'Enable only %s1',
			DISABLE_LINKS_BY_HOST						: 'Disable %s1',
			OPEN_LINKS_BY_HOST							: 'Open browser - %s1',
			SEARCH_WEB									: '%s1',


			'SUBMENU_RENAME_ALIGN'						: 'Rename - align',
			'SUBMENU_RENAME_ADD_REPLACE'				: 'Rename - add/replace',
			'SUBMENU_ENABLE_DISABLE'					: 'Enable/Disable',
			'SUBMENU_SORT'								: 'Sort',
			'SUBMENU_MOVE_FILE_BROWSE'					: 'Move/File/Add',
			'SUBMENU_SEARCH_WEB'						: 'Search WEB',
			'SUBMENU_SEARCH'							: 'Open/Search/Etc',

			SEARCH_GOOGLE_AUTHOR		: 'google.com (Author)',
			SEARCH_GOOGLE_TITLE			: 'google.com (Title)',
			
			MERGETOPACKAGEACTION		: 'Move to new Package...',
			MOVETODOWNLOAD				: 'Add to Download List',
			MOVETODOWNLOADANDSTART		: 'Start Downloads',
			MOVETODOWNLOADANDFORCESTART	: 'Force Start Downloads',
			MOVETODOWNLOADAFTERCONFIRM	: 'Add to Download List...',
			ADDATTOPTOGGLEACTION		: 'Toggle Add to Download List at top',

			DownloadTableContext	:"Downloads list - Rightclick menu",
			LinkgrabberContext		:"LinkGrabber list - Rightclick menu",
//			DownloadTabBottomBar	:"DownloadTabBottomBar",
//			LinkgrabberTabBottomBar	:"LinkgrabberTabBottomBar",

			SEPERATOR:
				'Separator',
			INSTALLMENU_MESSAGE:
				'==========================\n'+
				' Right click menu Install\n'+
				'==========================\n\n'+
				'%s1\n'+
				'_______________________________________\n\n'+
				'%s2',
			INSTALLMENU_INTRO:
				'Add an item to the right-click menu\n\n'+
				'  Link grabber - right-click menu\n'+
				'  Download list - right-click menu\n\n'+
				'Note:\n'+
				'  The added menu items can be edited later on "Menu Manager".\n'+
				'  Create a backup file of each menu before installation.\n'+
				'  Backup files can be restored to their previous state by importing them from "Menu Manager".\n',
			INSTALLMENU_LANG:
				'\nSelect the language of the menu item that you want to install.\n\n',
			INSTALLMENU_MENU:
				'Add a menu to\n"%s1" ?\n\n\n'+
				'* A backup of the currently used menu will be saved in the /cfg/ folder of JD.',
			INSTALLMENU_EXECUTE:
				'Create a "backup file" of the following menu,\n and then execute "installation".\n\n'+
				'Are you sure?\n\n\n'+
				'%s1\n'+
				'* The menu can be restored to its previous state by importing the backup file from "Menu Managemer".',
			INSTALLMENU_EBACKUP:
				'ERROR: Failed to create the backup file\n\n'+
				'Continue installation without backup?\n\n\n\n'+
				'%s1',
			INSTALLMENU_RESTART:
				'Instalation have been complete\n\n'+
				'"Restart JDownloader" is required to apply the menu\n\n'+
				'Restart JD now ?\n\n\n\n'+
				'%s1',
			INSTALLMENU_DONE:
				'Instalation is complete\n\n'+
				'Finished...\n\n\n\n'+
				'%s1',
			INSTALLMENU_CANCEL:
				'Install is canceled\n'+
				'Aborted...\n',
			INSTALLMENU_BACKUP_DONE:
				'Success',
			INSTALLMENU_BACKUP_NO:
				'Before Backup',
			INSTALLMENU_BACKUP_ERROR:
				'Failed',
			INSTALLMENU_INSTALL_DONE:
				'Done',
			INSTALLMENU_INSTALL_NO:
				'Yet',
			INSTALLMENU_INSTALL_ERROR:
				'Failed',
			INSTALLMENU_RESULT:
				'[Menu Type]        "%s1 (%s2)"\n'+
				'[Install Status]    %s3\n'+
				'[Backup Status]  %s4\n'+
				'[Backup Path]     "%s5"',
			INSTALLMENU_INDICATOR_1:
				'>',
			INSTALLMENU_INDICATOR_2:
				'  ',
			INSTALLMENU_INDICATOR_MSG:
				' Confirm to enter or leave install mode\n'+
				' Select the languale of right-click menus\n'+
				' Select right-click menus to install\n'+
				' Execute to install\n'+
				' End',
			JA:
				'Japanese',
			EN:
				'English',
			NEXT:
				'To next...',
			CLOSE:
				'Close',
			GOTO_START:
				'Go to start...',
			CONTINUE:
				'Continue',
			ABORT:
				'Aort',
			YES:
				'YES',
			NO:
				'NO',
			RESTART_NOW:
				'Restart Now',
			TO_LATER:
				'To later...',
			OK:
				'OK',
			CANCEL:
				'Cancel',
			INSTALL:
				'Install',
			RENAME_TO_ORIGIN_NAME_MSG:
				'[%s1]\n\n'+
				'Revert to Original Link Name ?\n\n-----------------------------------------------------------------\n%s2\n\n',
			RENAME_TO_ORIGIN_NAME_ITEM:
				'"%s1" -->\n"%s2"',
			RENAME_TO_ORIGIN_NAME_ITEM_SAME:
				'"%s1" -->\n   >>> [ Skip (same name) ]',
			RENAME_LINKS_BY_MSG:
				'[%s1]\r\nPackage "%s2" : Unsupported link\'s file extension  is found\r\n\r\nRename this package ?',
			CONFIRM_OPEN_BROWSER_WITH_TOO_MANY_URLS:
				'You are trying to open %s1 URLs in the browser.\nDo you want to allow execution?',
			ADDLINKTOLINKGRABBER_TIMEOUT:
				'Adding link to Linkgrabber timed out,\nso this action has been aborted.',
			ADDLINKSTOLINKGRABBER_IGNORE_DUP_URL:
				'Some links have same URLs\nIf there are duplicate URLs, only the first link will be added\n\nContinue adding?',
			ERROR_INVALID_TRIGGER_TYPE:
				'Invalid Event Trigger Type\n\n'+
				'Solution：Open Setting and "Event Script Setting", so find this script,\n'+
				'          choose trigger to "Select Download List Context Menu"\n'+
				'          Or "Select LinkGrabber Context Menu",\n'+
				'          Execute by Context Menu on the ListView\n',
			ERROR_INVALID_VALUE_IN_DISPATCHE_TABLE:
				'ERROR: Not found App.* method by the dispatch table at initDispatchTable()\n\t%s1:%s2',
		},
	};
	
	// check resourceTable
	if (this.config.DEBUG)
	{
		// check invalid type
		keys(r).forEach(function(k)
		{
			if (! (/^[a-z][-_a-z\d]*[a-z\d]$/i.test(k) || keys(r[k]).some(function(kk){return !(isRegExp(r[k][kk]) || isString(r[k][kk]))})) )
				throw TypeError('Invalid value in the resource table at initResourceTables()\nThe value must be a string or RegExp.');
		},this);
		
		// check diff resource ID by languege
		var allkey = {};
		keys(r).forEach(function(lng){
			keys(r[lng]).forEach(function(k){allkey[k]=1});
		});
		
		var buf = {};
		keys(r).forEach(function(lng){
			var tmp = keys(r[lng]).filter(function(k){return !allkey[k]});
			if (tmp&&tmp.length!==0) buf[lng] = tmp;
		});
		if (keys(buf).length !== 0) alert(buf);
	}
	
	defNoEnumProps(r,{
		getResource:function(id,lang){return(this.getTable(lang)||this.getTable(LANGUAGE_DEFAULT))[id]||id},
		hasLanguage:function(lang){return !!this[lang]},
		getTable:function(lang){return this[lang]},
		getLanguages:function(){return keys(this)},
	});
	
	this.resource    = r;
}


// ResourceTable 初期化の後
App.initDispatchTable = function()
{
	// 普通のメニュー名と対応したメソッド名
	var r1 = {
		// 名前は大文字英字と_のみ
		OPEN_EVERYTHING_BY_TITLE					: 'openEverythingByTitle',
		OPEN_EVERYTHING_BY_AUTHOR					: 'openEverythingByAuthorName',
		OPEN_LINK									: 'openLink',
		OPEN_JD_CFG_FOLDER							: 'openJDCfgFolder',
		OPEN_SOURCEURL								: 'openSourceURL',
		RENAME_LINKS_BY_PACKAGENAME					: 'renameLinksByPackageName',
		RENAME_PACKAGE_AND_LINKS_BY_CONTEXTLINKNAME	: 'renamePackageAndLinksByContextLinkName',
		RENAME_LINK_BY_LINKNAME						: 'renameLinkByLinkName',
		RENAME_LINK_BY_LINK_AUTHOR					: 'renameLinkByLinkAuthor',
		RENAME_LINK_BY_LINK_TITLE					: 'renameLinkByLinkTitle',
		RENAME_LINK_BY_LINK_CATEGORY_AUTHOR			: 'renameLinkByLinkCategoryAuthor',
		RENAME_LINK_BY_LINK_LONGTITLE				: 'renameLinkByLinkLongTitle',
		RENAME_STARTING_BRACKETS_MOVETO_END			: 'renameStartingBracketsMoveToEnd',
		RENAME_REMOVE_TRAILING_BRACKETS				: 'renameRemoveTrailingBrackets',
		RENAME_NUMBERING_FORMAT						: 'renameNumberingFormat',
		RENAME_AUTHOR_SWAP							: 'renameAuthorSwap',
		RENAME_AUTHOR_CHOP							: 'renameAuthorChop',
		RENAME_AUTHOR_X_TO_BATSU					: 'renameAuthorXtoBatsu',
		RENAME_TO_PACKAGIZER_NAME					: 'renameToPackagizerName',
		RENAME_TO_ORIGIN_NAME						: 'renameToOriginName',
		RENAME_ALIGN_DIGITS_LENGTH					: 'renameAlignDigitsLength',
		RENAME_FULLWIDTH_TO_HALFWIDTH				: 'renameFullwidthToHalf',
		RENAME_NORMALIZE							: 'renameNormalize',
		RENAME_URLDECODE							: 'renameURLDecode',
		
		MOVETO_NEWPACKAGE_WITH_FILENAME				: 'moveToNewPackageWithFileName',
//		MOVE_SAMENAME_PACKAGES_TO_PACKAGE			: 'moveSameNamePackagesToPackage',
		ADD_LINKS_TO_LINKGRABBER					: 'addLinksToLinkGrabber',
		SORT_PACKAGES_BY_TITLE_ASCENDING			: 'sortPackagesByTitleAscending',
		SORT_PACKAGES_BY_TITLE_DESCENDING			: 'sortPackagesByTitleDescending',
		SORT_PACKAGES_BY_AUTHOR_ASCENDING			: 'sortPackagesByAuthorAscending',
		SORT_PACKAGES_BY_AUTHOR_DESCENDING			: 'sortPackagesByAuthorDescending',
		SORT_PACKAGES_BY_CATEGORY_TITLE_ASCENDING	: 'sortPackagesByCategoryTitleAscending',
		SORT_PACKAGES_BY_CATEGORY_TITLE_DESCENDING	: 'sortPackagesByCategoryTitleDescending',
		SORT_PACKAGES_BY_CATEGORY_AUTHOR_ASCENDING	: 'sortPackagesByCategoryAuthorAscending',
		SORT_PACKAGES_BY_CATEGORY_AUTHOR_DESCENDING	: 'sortPackagesByCategoryAuthorDescending',
		SORT_PACKAGES_BY_ADDEDDATE_ASCENDING		: 'sortPackagesByAddedDateAscending',
		SORT_PACKAGES_BY_ADDEDDATE_DESCENDING		: 'sortPackagesByAddedDateDescending',
		SORT_PACKAGES_BY_MYRULE_ASCENDING			: 'sortPackagesByMyRuleAscending',
		SORT_PACKAGES_BY_MYRULE_DESCENDING			: 'sortPackagesByMyRuleDescending',
		ENABLE_LINKS_MYRULE_SINGLE					: 'enableLinksMyRuleSingle',
		ENABLE_LINKS_MYRULE_MULTIPLE				: 'enableLinksMyRuleMultiple',
	};
	// r1内にメニュー名が無ければr2
	// 正規表現マッチングさせるメニュー名と対応したメソッド名
	var r2 = {
		RENAME_ADD_TO_BEGIN_REGEXP					: 'renameAddMenunameToBegin',
		RENAME_ADD_TO_END_REGEXP					: 'renameAddMenunameToEnd',
		DISABLE_LINKS_BY_HOST_REGEXP				: 'disableLinksByHost',
		ENABLE_LINKS_BY_HOST_ONLY_REGEXP			: 'enableLinksByHostOnly',
		OPEN_LINKS_BY_HOST_REGEXP					: 'openLinksOnlyByHost',
	};
	
	// r2でマッチングしなければ、r3で順々に呼び出す
	// メニュー名と対応したメソッド名
	// 呼び出されたメソッドがtrueをreturnすればチェーンは止まる
	var r3 = [
		{SEARCH_ON_WEB	: 'searchOnWEBSite'},
	];
	// check dispatchTable
	if (this.config.DEBUG)
	{
		if (!this.resource) throw new Error('ERROR: coding error - initDispatchTable() cannot be called before initResourceTable()');
		keys(r1).forEach(function(k)
		{
			if (!isFunction(this[r1[k]]))
			{
				throw new Error(jdFormatString(this.getResource('ERROR_INVALID_VALUE_IN_DISPATCHE_TABLE'),[k,r1[k]]));
			}
		},this);
	}
	
	
//	const PROP_KEY_DISPATCHER = "App.dispatchTable";
//	var tmp = getProperty(PROP_KEY_DISPATCHER,true);
//	if (!tmp)
//	{
//		tmp = {};
	var tmp = {};
		this.resource.getLanguages().forEach(function(lng)
		{
			keys(r1).forEach(function(n)
			{
				const translated_name = this.resource.getResource(n, lng);
				tmp[translated_name] = r1[n];
			},this);
		},this);
		
//		setProperty(PROP_KEY_DISPATCHER,tmp,true);
//	}
	this.dispatcher = {};
	this.dispatcher.normal = tmp;
	this.dispatcher.regexp = r2;
	this.dispatcher.chain  = r3;
};

App.dispatch = function()
{
	// テスト実行ボタン経由ならメニューインストールモードに移行
	if (this.isTestRun())
		return this.installMenuMode();
	
	const event_name = this.name;
	const selection  = this.getSelection();

	// dispatch this.dispatcher.normal
	var method = this[this.dispatcher.normal[event_name]];
	if (isFunction(method))
		return method.call(this, event_name, selection);
	
	// dispatch this.dispatcher.regexp
	this.resource.getLanguages().some(function(lng)
	{
		keys(this.dispatcher.regexp).some(function(n)
		{
			var regexp_name = this.resource.getResource(n, lng);
			if (isRegExp(regexp_name))
			{
				var r = regexp_name.exec(event_name);
				if (!r) return false;
				method = this[this.dispatcher.regexp[n]];
				if (isFunction(method))
					method.call(this, r[1]?r[1].trim():event_name, selection);
			}
		},this);
	},this);
	
	// dispatch this.dispatcher.chain
	// To stop the chain, return true.
	this.dispatcher.chain.some(function(o)
	{
		method = this[o[keys(o)[0]]];
		if (!isFunction(method)) return false;
		var result = method.call(this, event_name, selection);
		return result;
	},this);
};


//-------------------[Start install menu]-------------------//
App.isTestRun = function()
{
	return btnEvents.isTestRun(this.menu)
		&& this.name=='MyMenuButton'
		&& this.icon=='myIconKey'
		&& this.shortCutString=='myShortcut';
};

const menuType={
	container:'CONTAINER',
	action:'ACTION',
	separator:'ACTION',
};
const menuClass = {
	contextmenu :'org.jdownloader.extensions.eventscripter.GenericEventScriptTriggerContextMenuAction',
//	toolbar     :'org.jdownloader.extensions.eventscripter.GenericEventScriptTriggerToolbarAction',
//	mainmenu    :'org.jdownloader.extensions.eventscripter.GenericEventScriptTriggerMainmenuAction',
	separator   :'org.jdownloader.controlling.contextmenu.SeparatorData',
	container   :'org.jdownloader.controlling.contextmenu.MenuContainer'
};

/**
 * メニューデータを再構築
 *
 * @param {menuItem|menuItem[]} menus メニューデータ
 * @param {string} seperator_name セパレータの名前
 * @returns {object} 引数で渡されたメニューデータxを再構築した新しいメニューデータ
 */
function rebuildMenu(menus,seperator_name)
{
	function r(m)
	{
		// Set default value
		if (m.visible  === undefined) m.visible  = true;
		if (m.shortcut === undefined) m.shortcut = null;
		if (m.mnemonic === undefined) m.mnemonic = null;
		if (m.iconKey  === undefined) m.iconKey  = null;
		if (m.name     === undefined) m.name     = null;
		
		// itemsが配列ならサブメニュー
//		if (isArray(m.items) && m.items.length)
		if (isArray(m.items))
		{
			m.type = menuType.container;
			if (m.className === undefined)
				m.className  = menuClass.container;
			m.actionData = {};
			m.items.forEach(function(v,i,l){r(l[i])});
		}
		else if (m.name==seperator_name)
		{
			m.type       = menuType.separator;
			m.className  = menuClass.separator;
			m.actionData = {};
			m.items      = [];
		}
		else
		{
			m.type      = menuType.action;
			m.className = null;
			m.items     = [];
			if (m.actionData === undefined) m.actionData = {};
			if (m.actionData.clazzName === undefined)
				m.actionData.clazzName = menuClass.contextmenu;
		}
	}
	
	var new_menu = simpleClone(menus);
	
	if (isArray(new_menu))
		new_menu.forEach(function(val,idx,list){r(list[idx])});
	else
		r(new_menu);

	return new_menu;
}
/**
 * コンテキストに応じたルートメニューを取得する
 *
 * @param {'DownloadTableContext'|'LinkgrabberContext'} context コンテキスト
 * @returns {menuItem} ルートメニューデータ（JSON）
 */
function getRootContextMenu(context)
{
	const storage   = 'cfg/menus_v2/'+context;
	const if_class = 'org.jdownloader.controlling.contextmenu.ContextMenuConfigInterface';
	return callAPI('config','get',if_class,storage,'menu');
}

/**
 * メニューデータをルートとして、コンテキストに応じたメニューに設定する
 * （設定の反映にはJDの再起動が必要）
 *
 * @param {menuItem} x メニューデータ
 * @param {'DownloadTableContext'|'LinkgrabberContext'} context コンテキスト
 * @returns {boolean} 成功か失敗か
 */
function setRootContextMenu(root_menu, context)
{
	const storage   = 'cfg/menus_v2/'+context;
	const if_class = 'org.jdownloader.controlling.contextmenu.ContextMenuConfigInterface';
	return callAPI('config','set',if_class,storage,'menu',root_menu);
}

/**
 * メニューデータをコンテキストに応じたルートメニューに追加して設定する
 * （設定の反映にはJDの再起動が必要）
 *
 * @param {menuItem|menuItem[]} menu_items メニューデータ
 * @param {'DownloadTableContext'|'LinkgrabberContext'} context コンテキスト
 * @returns {boolean} 成功か失敗か
 */
function installMenu(context, menu_items)
{
	/** @type {menuItem} ルートメニュー取得 */
	var root_container = getRootContextMenu(context);
	if (!root_container || root_container.type!=menuType.container || !isArray(root_container.items))
		return false;
	if (Array.isArray(menu_items))
		menu_items.forEach(function(menu_item){root_container.items.push(menu_item)});
	else
		root_container.items.push(menu_items);
	
//	return true;		// for DEBUG
	return setRootContextMenu(root_container, context);
}

function exportMenu(context, output_file)
{
	var top_menu = getExportedMenu(context);
	if (!top_menu) return false;
	try
	{
		writeFile(output_file, JSON.stringify(top_menu,null,4),false);
	}
	catch(e)
	{
		return false;
	}
	return true;
//	return false;		// for DEBUG
}

function getExportedMenu(context)
{
	const storage = 'cfg/menus_v2/'+(context||menusV2.DLC);
	const if_class = 'org.jdownloader.controlling.contextmenu.ContextMenuConfigInterface';
	var exported_menu = {};
	exported_menu['root']   = callAPI('config','get',if_class,storage,'menu');			// object
	exported_menu['unused'] = callAPI('config','get',if_class,storage,'unuseditems');	// array
	return (exported_menu['root']) ? exported_menu : null;
}

function getDateTimeMSecString(d)
{
	return d.getFullYear()+'-'+zeroPadding(d.getMonth(),2)+'-'+zeroPadding(d.getDate(),2)
		+'_'+zeroPadding(d.getHours(),2)+zeroPadding(d.getMinutes(),2)+zeroPadding(d.getSeconds(),2)
		+'_'+zeroPadding(d.getMilliseconds(),3);
}

/**
 * enumAllMenuItems JDのmenu構造のitemを全て列挙
 *    再帰処理を使わないスタックによる処理
 *    列挙順序は浅層から深層、一度親を列挙し切ってから子～を列挙する
 *
 * @param {object} menus itemを列挙するmenu構造オブジェクト
 * @param {function} func 各item毎に呼び出されるコールバック関数
 *                        func(menuItem, parentItemsIndex, parentItems, menus);
 *                        true相当を返すと列挙を中断する
 * @param {object} thisObj func関数が呼び出される時に使用するthisオブジェクト
 *                         nullかundefinedならグローバルスコープでfuncを実行
 * @returns {boolean} itemを全て列挙しきってループが終了した場合false
 *                    途中でreturn trueされて中断された場合true
 *                    Array.prototype.someと似た仕様
 */
function enumAllMenuItems(menus,func,thisObj)
{
	var result = false, current = null, stack = [menus];
	while((current=stack.pop()) && !(result=current.some(function(x, i, l)
	{
		if (!x) return false;
		if (func.call(thisObj, x, i, l, menus)) return true;
		if (isArray(x.items) && 0 < x.items.length)
			stack.push(x.items);
	})));
	
	return result;
}

App.insertMenuNames = function(/*IN OUT*/menus, id, namelist, lang)
{
	var names = namelist;
	if (!isArray(menus)) return false;
	if (!(names!=null)) return false;
	if (!(isArray(names)&&names.length))
	{
		if (!isObject(names)) return false;
		names = keys(names);
		if (0===names.length) return false;
	}
	
	var submenu_name = 'INSERTMENU.'+id;
	var tpl = this.getResource(id,lang);
	var items = names.map(function(n){
		return {name:jdFormatString(tpl,this.getResource(n,lang))}
	},this);
	
	if (enumAllMenuItems(menus, function(item,i,parentItems)
	{
		if (item.name != submenu_name) return false;
		if (item.iconKey)			// iconKeyのデフォルト値があればitemsに設定
			items.forEach(function(it){it.iconKey=item.iconKey});
		parentItems.splice(i,1);	// 挿入場所目印のitemを削除
		Array.prototype.splice.apply(parentItems, [i,0].concat(items));	// parentItems.splice(i,0, ...items)同等、itemsを挿入
		return true;	// 列挙を停止
	},this))
		return true;
	
	return 0 !== Array.prototype.push.apply(menus, items);
};

App.getMenu = function(lang, context)
{
	// UserConfig内の設定から取得する
	const insertNameIds = [
		'RENAME_ADD_TO_END',
		'RENAME_ADD_TO_BEGIN',
		'ENABLE_LINKS_BY_HOST_ONLY',
		'DISABLE_LINKS_BY_HOST',
		'OPEN_LINKS_BY_HOST',
		'SEARCH_WEB',
	];
	var separator = this.translation.getSeparatorName();	// JDの言語ファイルから取得
	var menuItems = simpleClone(this.config.menuConfig.templateMenuItems);
	
	// Translate menu names
	enumAllMenuItems(menuItems, function(item)
	{
		if (!item.name) return;
		item.name = (item.name == '-' && !item.items) ? separator : this.getResource(item.name, lang);
		
		// check context
		if (item.context !== undefined)
		{
			var menu_ctx = 0+item.context;
			delete item.context;
			
			if (menu_ctx != 0 && btnEvents[context])
			{
				item.visible = (0 != (btnEvents[context]&menu_ctx));
			}
		}
	}, this);
	
	// Insert menu names
	insertNameIds.forEach(function(id){
		this.insertMenuNames(menuItems, id, this.config.menuConfig[id], lang);
	},this);
	
	// Rebuild menu
	return rebuildMenu(menuItems, separator);
};

function renameIfFileExists(path)
{
	const f = getPath(path);
	if (!f.exists()) return path;
	var f_path = f.getParent() + f.getPathSeparator();
	var f_ext = f.getExtention();
	var f_name = f.getName();
	if (f_ext)
	{
		f_ext = '.'+f_ext;
		f_name = f_name.slice(0, f_ext.length*-1);
	}
	f_path += f_name;
	const max = 100;
	for (var i=1;i<max;i++)
	{
		var tmp_path = f_path+'_'+i+f_ext;
		if (! getPath(tmp_path).exists()) return tmp_path;
	}
	return path;
}

const mState = {
	NO:0,
	DONE:1,
	ERROR:2,
	str:function(r){return {0:'NO',1:'DONE',2:'ERROR'}[r||0]},
	state:function(r){return r?this.DONE:this.ERROR},
	isOK:function(s){return this.DONE==s},
};
function buPath(f,t){return renameIfFileExists(jdPath('cfg\\'+jdFormatString(f,[t])))};
const C3 = {LinkgrabberContext:'LGC',DownloadTableContext:'DLC'};
const C7 = {LGC:menusV2.LGC,DLC:menusV2.DLC};
App.installMenuMode = function()
{
	const IM = 'INSTALLMENU_';
	const EXIT = '$exit$';
	const BUTTON1 = 1;
	const BUTTON2 = 0;
	const datetime = getDateTimeMSecString(new Date);
	const BACKUP_PATH = {DLC:buPath('backup_%s1.jdDLMenu',datetime), LGC:buPath('backup_%s1.jdLGMenu',datetime)};
	const indicator_list = this.getResource(IM+'INDICATOR_MSG').split(/[\r\n]+/).filter(function(s){return s.trim()});
	const indicator_1    = this.getResource(IM+'INDICATOR_1');
	const indicator_2    = this.getResource(IM+'INDICATOR_2');
	const msg_template   = this.getResource(IM+'MESSAGE');
	
	// key:{
	//   ind:インディケータのindex
	//   btn1:ボタン1の文字列
	//   btn2:ボタン2の文字列
	//   next1:ボタン1を押した時に遷移する先のkey
	//   next2:ボタン2を押した時に遷移する先のkey
	//   next:ボタンを押した時に遷移する先のkey
	//   onBtn1:ボタン1を押した時に呼び出されるCallback（返り値を優先してnext扱い）.call(this,pages,page,nextid)
	//   onBtn2:ボタン2を押した時に呼び出されるCallback（返り値を優先してnext扱い）.call(this,pages,page,nextid)
	//   msg:表示するテキストのResourceIDか文字列
	//   onMessage:表示するテキストが必要な時に呼び出されるCallback（返り値を優先してmsg扱い）.onMessage.call(this,pages,page,nextid);
	// }
	// nextでEXIT = '$exit$'を指定すれば終了
	var pages ={
		menus:[],
		mlang:'',
		intro  :{ind:0,btn1:'NEXT',btn2:'ABORT',next1:'lang',next2:'cancel',
				onBtn1:function(ps){ps.mlang=LANGUAGE_JA;ps.lastResult=false;ps.menus=[];
				keys(ps).forEach(function(k){delete ps[k].result})}},	// reset
		lang   :{ind:1,btn1:'JA', btn2:'EN',next:'lgc',
				onBtn1:function(ps){ps.mlang=LANGUAGE_JA},onBtn2:function(ps){ps.mlang=LANGUAGE_EN}},
		lgc    :{ind:2,btn1:'YES',btn2:'NO',msg:['MENU', menusV2.LGM],next:'dlc',
				onBtn1:function(ps){ps.menus.push(new String(menusV2.LGM))}},
		dlc    :{ind:2,btn1:'YES',btn2:'NO',msg:['MENU', menusV2.DLM],next:'execute',
				onBtn1:function(ps){ps.menus.push(new String(menusV2.DLM))},
				onBtn2:function(ps){if(ps.menus.length==0)return'cancel'}},
		execute:{ind:3,btn1:'INSTALL',btn2:'CANCEL',next1:'restart',next2:'cancel',error:'ebackup',
				onMessage:function(ps,p){return ['EXECUTE',ps.menus.map(function(c){
						return this.jdFormat(IM+'INSTALL_NO',[c,ps.mlang.toUpperCase()])+'\n'
					},this).join('')];},
				onBtn1:function(ps,p)
				{
					if (! ps.exportMenu.call(this,ps,p))  return p.error;
					if (! ps.installMenu.call(this,ps,p)) return p.next2;
				}},
		ebackup:{ind:3,btn1:'INSTALL',btn2:'ABORT',next1:'restart',next2:'cancel',
				onBtn1:function(ps,p)
				{
					if (! ps.installMenu.call(this,ps,p)) return p.next2;
				}},
		restart:{ind:3,btn1:'RESTART_NOW',btn2:'TO_LATER',next:'done',
				onBtn1:function(){callAPI('system','restartJD')}},
		done   :{ind:4,btn1:'CLOSE',btn2:'GOTO_START',next1:EXIT,next2:'intro'},
		cancel :{ind:4,btn1:'CLOSE',btn2:'GOTO_START',next1:EXIT,next2:'intro'},
		installMenu:function(ps,p)
				{	// install
					ps.menus.forEach(function(c){
						c.installed = mState.state(installMenu(c, this.getMenu(ps.mlang,C3[c])))},this);
					return !ps.menus.some(function(c){return !mState.isOK(c.installed)});
				},
		exportMenu:function(ps,p)
				{	// exports
					ps.menus.forEach(function(c){
						c.backuped = mState.state(exportMenu(c,BACKUP_PATH[C3[c]]))});
					return !ps.menus.some(function(c){return !mState.isOK(c.backuped)});
				},
		// return result as page.msg
		getResult:function(ps,p,id)
				{
					return([
						id.toUpperCase(),
						ps.menus.map(function(c){
							var n = IM+('INSTALL_'+mState.str(c.installed));
							var b = IM+('BACKUP_' +mState.str(c.backuped ));
							return this.jdFormat(IM+'RESULT',
								[c, ps.mlang.toUpperCase(), n, b, BACKUP_PATH[C3[c]]])+'\n'
						},this).join('\n')
					]);
				},
	};
	pages.execute.onMessage = 
	pages.ebackup.onMessage = 
	pages.restart.onMessage = 
	pages.done.onMessage    = pages.getResult;

	var max_dialog_count = 30;
	var lastResult = false;
	var nextid = 'intro';
	while (nextid != EXIT)
	{
		var page = pages[nextid];
		var msg = page.msg;
		if (isFunction(page.onMessage)) msg = page.onMessage.call(this,pages,page,nextid);
		else if (msg===undefined) msg = nextid.toUpperCase();
		msg = isArray(msg)?msg.concat():[""+msg];
		msg[0] = IM+msg[0];
		msg = jdFormatString(msg_template, [this.jdFormat(msg[0], msg.length==1?undefined:msg.slice(1)),
			indicator_list.map(function(s,i){return(i==page.ind?indicator_1:indicator_2)+s+'\n'}).join('')]);
		lastResult = page.result = this.confirm(msg, page.btn1, page.btn2);
		if (max_dialog_count-- <= 0)
		{
			alert('ERROR: showConfirmDialog() called over max count.');
			break;
		}
		for(var i=1;i<=2;i++)
		{
			if (page.result != (i&1)) continue;
			if (isFunction(page['onBtn'+i]))
			{
				nextid = page['onBtn'+i].call(this,pages,page,nextid);
				if (nextid != null) break;
			}
			nextid = page['next'+i] || page['next'] || EXIT;
			break;
		}
	}
};
//--------------------[End install menu]--------------------//


App.init = function()
{
	this.config.initConfig();
	
	// JD言語設定をリソーステーブルの使用言語に設定
	// リソーステーブルの言語に無ければ、デフォルトの'en'にする
	this.script_language = this.translation.language;
	this.initResourceTables();
	if (! this.resource.hasLanguage(this.script_language))
		this.script_language = LANGUAGE_DEFAULT;
	
	this.initDispatchTable();
};


App.setEventProperty = function(props)
{
	this.menu = props.menu;
	this.name = props.name;
	this.icon = props.icon;
	this.shortCutString = props.shortCutString;
	
	this.DLC = {
		contextId:        'DLC',
		selection:        null,
		APIName:          'downloadsV2',
		getAllPackages:   getAllFilePackages,
		getAllLinks:      getAllDownloadLinks,
		getPackageByUUID: getDownloadPackageByUUID,
		getLinkByUUID:    getDownloadLinkByUUID,
		moveLinks:        API.moveLinks,
		movePackages:     API.movePackages,
		movetoNewPackage: API.movetoNewPackage,
		queryLinks:       API.queryLinks,
		startOnlineStatusCheck: API.startOnlineStatusCheck,
	};
	this.LGC = {
		contextId:        'LGC',
		selection:        null,
		APIName:          'linkgrabberv2',
		getAllPackages:   getAllCrawledPackages,
		getAllLinks:      getAllCrawledLinks,
		getPackageByUUID: getCrawledPackageByUUID,
		getLinkByUUID:    getCrawledLinkByUUID,
		moveLinks:        API.moveLinks,
		movePackages:     API.movePackages,
		movetoNewPackage: API.movetoNewPackage,
		queryLinks:       API.queryLinks,
		startOnlineStatusCheck: API.startOnlineStatusCheck,

		addLinks:            API.addLinks,
		moveToDownloadlist:  API.moveToDownloadlist,
		queryLinkCrawlerJobs:API.queryLinkCrawlerJobs,
		abort:               API.abort,
	};
	/*
	this.DLC = {
		contextId:        'DLC',
		selection:        null,
		APIName:          'downloadsV2',
		getAllPackages:   getAllFilePackages,
		getAllLinks:      getAllDownloadLinks,
		getPackageByUUID: getDownloadPackageByUUID,
		getLinkByUUID:    getDownloadLinkByUUID,
		moveLinks:        function(linkIds,afterLinkID,destPackageID){return callAPI(this.APIName,APIMethod.moveLinks,linkIds,afterLinkID,destPackageID)},
		movePackages:     function(packageIds,afterDestPackageId){return callAPI(this.APIName,APIMethod.movePackages,packageIds,afterDestPackageId)},
		movetoNewPackage: function(linkIds,pkgIds,newPkgName,downloadPath){return callAPI(this.APIName,APIMethod.movetoNewPackage,linkIds,pkgIds,newPkgName,downloadPath)},
		queryLinks:       function(queryParams){return callAPI(this.APIName,APIMethod.queryLinks,queryParams)},
		startOnlineStatusCheck:function(linkIds,packageIds){return callAPI(this.APIName,APIMethod.startOnlineStatusCheck,linkIds,packageIds)},
	};
	this.LGC = {
		contextId:        'LGC',
		selection:        null,
		APIName:          'linkgrabberv2',
		getAllPackages:   getAllCrawledPackages,
		getAllLinks:      getAllCrawledLinks,
		getPackageByUUID: getCrawledPackageByUUID,
		getLinkByUUID:    getCrawledLinkByUUID,
		moveLinks:        function(linkIds,afterLinkID,destPackageID){return callAPI(this.APIName,APIMethod.moveLinks,linkIds,afterLinkID,destPackageID)},
		movePackages:     function(packageIds,afterDestPackageId){return callAPI(this.APIName,APIMethod.movePackages,packageIds,afterDestPackageId)},
		movetoNewPackage: function(linkIds,pkgIds,newPkgName,downloadPath){return callAPI(this.APIName,APIMethod.movetoNewPackage,linkIds,pkgIds,newPkgName,downloadPath)},
		queryLinks:       function(queryParams){return callAPI(this.APIName,APIMethod.queryLinks,queryParams)},
		startOnlineStatusCheck:function(linkIds,packageIds){return callAPI(this.APIName,APIMethod.startOnlineStatusCheck,linkIds,packageIds)},

		addLinks:         function(query){return callAPI(this.APIName,APIMethod.addLinks,query)},
		moveToDownloadlist:function(linkIds,packageIds){return callAPI(this.APIName,APIMethod.moveToDownloadlist,linkIds,packageIds)},
		queryLinkCrawlerJobs:function(query){return callAPI(this.APIName,APIMethod.queryLinkCrawlerJobs,query)},
		abort:            function(jobId){return callAPI(this.APIName,APIMethod.abort,jobId)},
	};
	*/
	this.CTX = this.LGC;	// this.CTX.* is alias to this.LGC.* or this.DLC.* by context
	if (this.isDLC())
	{
		this.DLC.selection = dlSelection;
		this.CTX = this.DLC;
	}
	else if (this.isLGC())
	{
		this.LGC.selection = lgSelection;
//		this.CTX = this.LGC;
	}
	else if (this.isTestRun())
	{
//		if (getGlobalThis()["dlSelection"])
		if (getGlobalThis().dlSelection)
		{
			this.DLC.selection = dlSelection;
			this.CTX = this.DLC;
		}
//		if (getGlobalThis()["lgSelection"])
		if (getGlobalThis().lgSelection)
		{
			this.LGC.selection = lgSelection;
			this.CTX = this.LGC;
		}
	}
	else
	{
		alert(this.menu);
		throw new Error();
	}
};

/**
 * showConfirmDialog() this.getResourceを挟むだけの単純ラッパー
 * 引数の文字列をthis.getResource(*Id)で置換可能なら置換する
 */
App.confirm = function(msgId, yesId, noId){return showConfirmDialog(this.getResource(msgId),this.getResource(yesId),this.getResource(noId))};

/**
 * 汎用リネーム関数（1アイテム完結）
 *     対象は選択されたリンク
 *
 * @param {(orig_name:string)=>string} callback_func 『リネーム前の名前』を受け取って
 *    『リネーム後の名前』を返すコールバック関数
 *     このコールバック関数は各リンク・パッケージのリネーム前に毎回呼び出される
 * @param {object[]=getItemsByContextType(App.getSelection()} packages_or_links packageかlinkの配列
 *      (指定されなければ、右クリックされたのがパッケージかリンクかで切り替える)
 *
 */
App.genericRenamer = function(callback_func)
{
	var items = getItemsByContextType(this.getSelection());

	items.forEach(function(l)
	{
		var orig_name = l.getName();
		var new_name = callback_func.call(this, orig_name);
		if (new_name && orig_name != new_name)
			l.setName(new_name);
	},this);
};


/**
 *  名前の全角英数を半角に置換
 */
App.renameFullwidthToHalf=function(event_name, selection)
{
//	alert("renameFullwidthToHalf",event_name, selection);
	this.genericRenamer(function(orig)
	{
		var regexp_all_FullWidth_AlphaNum = /[Ａ-Ｚａ-ｚ０-９]/g;
		return orig.replace(
			regexp_all_FullWidth_AlphaNum,
			function(m){return String.fromCharCode(m.charCodeAt(0)-0xFEE0)}
		)
	});
};

/**
 *  名前の中のURLエンコードされた部分をデコードする
 */
App.renameURLDecode = function(event_name, selection)
{
	this.genericRenamer(function(orig){return decodeURIComponent(orig)});
};

/**
 *  名前を正規化する
 */
App.renameNormalize = function(event_name, selection)
{
	this.genericRenamer(function(orig){return normalizeTitle(orig)});
};

/**
 * 文字列の先頭括弧内のカテゴリを置換する
 * 
 * @param str {string} 置換前の文字列
 * @param cat {string} 置き換えるカテゴリ文字列
 * @returns {string} 置換後の文字列
 */
function replaceCategory(str, cat)
{
	if (!cat) return str;

//	var regexp_category_and_author = /^ *\((?:一般|同人|成年|18禁|アニメ|BL|官能|少女|ライトノベル|書籍)[^\)]*\)(?: *\[[^\]]+\])? *$/;
	var regexp_category = /^\((?:一般|同人|成年|18禁|アニメ|BL|官能|少女|ライトノベル|書籍)[^\)]*\) */;
	
//	if (!regexp_category_and_author.test(str) || !regexp_category.test(str))
	if (!regexp_category.test(cat) || !regexp_category.test(str))
		return cat.trim() + ' ' + str;
	
	return str.replace(regexp_category, cat.trim() + ' ');
}

/**
 *  名前の先頭に指定文字列を追加
 *     ※ (○○) がカテゴリ名っぽかったら、置換モード
 *
 *  　メニュー名 "(一般小説) >>"
 *  　"[作者名] 作品名.zip" =>  "(一般小説) [作者名] 作品名.zip"
 *
 */
App.renameAddMenunameToBegin = function(event_name, selection)
{
	if (! event_name) return;
	this.genericRenamer(function(orig){return replaceCategory(orig, event_name)});
};

/**
 * 名前の末尾にメニュー名を追加
 *    ※名前の中にメニュー名があればリネームしない
 *
 * 　メニュー名 "<< 寄せ集め"
 *  　"[作者名] 作品名.zip" =>  "[作者名] 作品名 寄せ集め.zip"
 * 
 */
App.renameAddMenunameToEnd = function(event_name, selection)
{
	if (!event_name) return;
	this.genericRenamer(function(orig)
	{
		// 追加する文字列が既に含まれていればスキップ
		if (orig.indexOf(event_name) != -1) return '';
		return getFileSpec(orig) + ' ' + event_name + getExt(orig);
	});
};

/**
 * 名前の後ろから括弧を探して削除
 */
App.renameRemoveTrailingBrackets = function(event_name, selection)
{
	this.genericRenamer(function(orig){
		var regexp_bottom_various_brackets = / *(?:\[.+?\]|\(.+?\)|【.+?】|（.+?）|［.+?］)(.*?)$/;
		return orig_name.replace(regexp_bottom_various_brackets, "$1");
	});
};

/**
 * 名前の先頭括弧を後方に移動
 *     入れ子は考慮外
 */
App.renameStartingBracketsMoveToEnd = function(event_name, selection)
{
	this.genericRenamer(function(orig){
		const topbrackets_and_otherpart
			= /^(\(.+?\)|\[.+?\]|【.+?】|（.+?）|［.+?］)\) *((.+?)(?:\.[\da-z]{2,8})?\.[\da-z]{2,8})?$/i;
		return replaceCategory(orig.replace(topbrackets_and_otherpart, "$2 $1$3"), '');
	});
};


function comicNumbering(str)
{
	return (isNaN(str)||str.length==2)?str:(str.length==1)?('0'+str):str.replace(/^0+(\d\d)$/,'$1');
}
function replaceNums(str)
{
	return str.replace(/\d+/g,function(x){return comicNumbering(x);})
}

/**
 * 第○○巻化
 *    v02→第02巻、v01-03→第01-03巻 へのリネーム
 *
 * 【右クリックされた項目】
 * 　　パッケージをクリックしていればパッケージ名を対象とする
 * 　　リンクをクリックしていればリンク名を対象とする
 *
 * 【選択されている項目】
 * 　　選択されているパッケージ、リンクの名前をリネーム対象とする
 */
 
App.renameNumberingFormat = function(event_name, selection)
{
	this.genericRenamer(function(orig){
		const anno = {w:' 透かし有り',s:' 寄せ集め',b:' 別スキャン',e:' (完)',A:' 単行本'};
		var dest = '';
		var res = [];
		
		// 既に「巻」がある
		if (res = /^(.+?)(第|全)?(\d{1,3}(?:[-+]\d{1,3})*巻.*)$/.exec(orig))
		{
			if (res[2]) return '';
			
			// 「第」抜け
			dest = res[1]+'第'+res[3];
		}	// 「話」
		else if (res = /^(.+?)[ _]ch?[-\.]?(\d{1,}(?:-\d{1,})?)(.*)$/i.exec(orig))
			dest = res[1] +' 第'+ replaceNums(res[2]) +'話'+ res[3];
		else
		{
			// "Lv." 誤認識を予め排除
			const reg_vol_num = /^(.+?[^Ll])(?:(?:v|[vV]ol(?:ume)?|VOL(?:UME)?)[ \.]? *)(\d{1,3}(?:[-+\.]\d{1,3})*)(e?A|[esbw]+)?\b(.*?)$/;
			const reg_numonly = /^(.+?) (\d{1,3}(?:[-+]\d{1,3})*)(e?A|[esbw]+)?( .+?)?$/;
			
			if ( (res = reg_vol_num.exec(orig)) || (res = reg_numonly.exec(orig)) )
//				||  (res = /^(.+?) *(?:[vV](?:[oO][lL][ \.]? *)?)?(\d{1,3}(?:[-+\.]\d{1,3})*)(e?A|[esbw]+)?\b(.*)$/.exec(orig)) )
			{
				dest = res[1] +' 第'+ replaceNums(res[2]) +'巻';
				if (res[3] && (res[3] in anno))
					dest += anno[res[3]];
				if (res[4])
					dest += res[4];
				dest = dest.replace(/  +/g, ' ').trim();
			}
		}
		return dest;
	});
};

/**
 * []内のスワップ
 * [○○×△△]→[△△×○○]
 */
App.renameAuthorSwap = function(event_name, selection)
{
	this.genericRenamer(function(orig){return orig.replace(/\[(.+?)×([^×]+?)\]/, '[$2×$1]')});
}

/**
 * []内の末尾切り捨て
 * [○○×△△×□□]→[○○×△△]
 */
App.renameAuthorChop = function(event_name, selection)
{
	this.genericRenamer(function(orig){return orig.replace(/\[(.+?)×(?:[^×]+?)\]/, '[$1]')});
};

/**
 * []内のxを×に変換
 * [○○x△△]→[○○×△△]
 */
App.renameAuthorXtoBatsu = function(event_name, selection)
{
	this.genericRenamer(function(orig){return orig.replace(/\[([^×]+?)x([^×]+?)\]/, '[$1×$2]')});
};

/**
 * 名前の数字部分の桁を揃える
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】選択されたリンクの名前の数字部分の桁を揃える
 *
 * ※ 最小桁数=2
 *
 */
App.renameAlignDigitsLength = function(event_name, selection)
{

	var min_length = 2;									// 最小桁数
	var regexp_name = /^(\D*)(0*(\d+))(.*?)$/i;			// 数字有り文字列

	// 最大桁数を取得
	var max_length = min_length;
	selection.links.forEach(function (l)
	{
		var r = getFileSpec(l.getName()).match(regexp_name);
 		if (r && (r[2].length > max_length))
			max_length = r[2].length;
	});
	this.genericRenamer(
		function(orig)
		{
			var r = getFileSpec(orig).match(regexp_name);
			if (!r) return null;
			return r[1] + zeroPadding(r[3], max_length) + r[4] + getExtFull(orig);
		}
	);
};



/**
 * 汎用リネーム関数（前処理でヒントを取得してのリネーム）
 * 
 * @param {(contextItemName:string)=>string} funcGetHint
 *    右クリック直下のアイテムの名前が渡されるので、
 *    各リンク・パッケージをリネームする際に渡されるヒントを返す
 *    (右クリック直下のアイテムが無ければ、選択された一番上のアイテム)
 * @param {(orig_name:string, hint:string)=>string} funcRename
 *     各リンク・パッケージをリネームする毎に呼び出される（リネーム直前）
 *     各リンク・パッケージそれぞれの変更前の名前とfuncGetHintで
 *     返したヒントが渡されるので、変更後の新しい名前を返す
 */
App.genericRenamerWithHint = function(funcGetHint, funcRename)
{
	var sel = this.getSelection();
	var items=null;
	var contextItemName = '';
	var contextItemUUID = 0;

//	* 2024/01/20	希にsel.contextPackageが右クリック直下のパッケージではなく、
//					最後に選択したパッケージor選択の一番下のパッケージになる場合がある。
//					JDの再起動で直るが、スクリプトからでは判別不能のため代替措置は無理。

	if (sel.isPackageContext())
	{
		items = sel.packages;
		contextItemName = sel.contextPackage.getName();
		contextItemUUID = sel.contextPackage.UUID;
	}
	else if (sel.isLinkContext())
	{
		items = sel.links;
		contextItemName = sel.contextLink.getName();
		contextItemUUID = sel.contextLink.UUID;
	}
	if (! items || items.length <= 1) return;
	if (contextItemName == '') contextItemName = items[0].getName();
	
	var hint = funcGetHint ? ((funcGetHint).call(this, contextItemName)) : contextItemName;
	if (!hint) return;
	
	items.forEach(function(l)
	{
		if (l.UUID == contextItemUUID) return;
		
		var orig_name = l.getName();
		var new_name = funcRename ? ((funcRename).call(this, orig_name, hint)) : hint;
		if (new_name && orig_name != new_name)
			l.setName(new_name);
	},this);
};

/**
 * プロパティに設定された値を新しい名前として選択されているリンクをリネーム
 */
App.renameToProperty = function(eventname, selection, prop_name)
{
	//
	// 対象列挙
	//
	var items = [];
	selection.links.forEach(function (l)
	{
		var original = l.getProperty(prop_name);
		if (!original) return;
		items.push({target:l, renameTo:original});
	},this);
	if (items.length === 0) return;
	
	//
	// 確認
	//
	var msg = this.jdFormat('RENAME_TO_ORIGIN_NAME_MSG',
		[eventname, items.map(function(x){return this.jdFormat(
			(x.target.getName() != x.renameTo ? 'RENAME_TO_ORIGIN_NAME_ITEM' : 'RENAME_TO_ORIGIN_NAME_ITEM_SAME'),
			[x.target.getName(), x.renameTo])},this).join('\n\n')]);
	if (!this.confirm(msg, 'YES','NO'))
		return;

	//
	// リネーム
	//
	items.links.forEach(function (x)
	{
		if (x.renameTo && x.target.getName() != x.renameTo)
			x.target.setName(x.renameTo);
	},this);
};
/*
App.renameToProperty = function(eventname, selection, prop_name)
{
	var items = [];
	selection.links.forEach(function (l)
	{
		var original = l.getProperty(prop_name);
		if (!original) return;
		
		items.push(jdFormatString(this.getResource(
			l.getName() != original ? 'RENAME_TO_ORIGIN_NAME_ITEM' : 'RENAME_TO_ORIGIN_NAME_ITEM_SAME'
		),[l.getName(),original]));
	},this);
	if (items.length === 0) return;
	
	var msg = this.jdFormat('RENAME_TO_ORIGIN_NAME_MSG', [event_name, items.join('\n\n')]);
	if (!this.confirm(msg, 'YES','NO'))
		return;
	
	selection.links.forEach(function (l)
	{
		var original = l.getProperty(prop_name);
		if (original && l.getName() != original)
			l.setName(original);
	},this);
};
*/

/**
 * リンクを（パッケージャ適用後の）元の名前に戻す
 *     リンクのプロパティ"PACKAGIZER_NAME"に設定されている名前にリネーム
 *     ON_PACKAGIZERイベント時のstate=='AFTER'(2度目)で設定されたnameを想定
 *     別途EventScriptを導入必須
 */
App.renameToPackagizerName = function(event_name, selection)
{
	this.renameToProperty(event_name, selection, "PACKAGIZER_NAME");
};


/**
 * リンクを（パッケージャ適用前の）元の名前に戻す
 *     リンクのプロパティ"ORIGIN_NAME"に設定されている名前にリネーム
 *     ON_PACKAGIZERイベント時のstate=='BEFORE'(1度目)で設定されたnameを想定
 *     別途EventScriptを導入必須
 */
App.renameToOriginName = function(event_name, selection)
{
	this.renameToProperty(event_name, selection, "ORIGIN_NAME");
};


/**
 * 名前を揃える
 *
 * 【クリックされたファイルの名前】で、【選択されているファイルの名前】を揃える
 *
 * パッケージ名同士を揃える必要はない、パッケージを跨いで名前を揃える必要もないため
 * 同一パッケージ内のリンクのみ対象
 * 一つのパッケージ内でのみ有効
 */
App.renameLinkByLinkName = function(event_name, selection)
{
	if (selection.isPackageContext()) return;		// パッケージがクリックされているか
	if (1 != selection.packages.length) return;		// 2つ以上のパッケージが選択されているか
	if (! selection.packages[0].expanded) return;	// パッケージが閉じているか
	
	this.genericRenamerWithHint(null, null);
};


/**
 * ファイル名[作者名]を揃える
 * 
 * 【クリックされたファイルの[]内】で、【選択されているファイルの[]内】を揃える
 * 
 */
App.renameLinkByLinkAuthor = function(event_name, selection)
{
// ( ()先頭括弧 繰り返し ) ( [] 繰り返し)
	var regexp_name
		= /^((?:\([^\(\)]+\) *)*)((?:\[[^\[\]]*(?:\[[^\[\]]+\][^\[\]]*)*\] *)*)(.+?)$/i;
	this.genericRenamerWithHint(
		function(orig){var r=orig.match(regexp_name);return (r&&r[2])?r[2]:null},
		function(orig, hint){return orig.replace(regexp_name,function(m,m1,m2,m3){return (m1?(m1.trim()+' '):'')+hint.trim()+' '+m3.trim()})}
	);
};

/**
 * ファイル名(カテゴリ) [作者名]を揃える
 *
 * 【クリックされたファイルの(○○) [△△]】で、【選択されているファイルの(○○) [△△]】を揃える
 * 無ければ(○○) [△△]を追加する
 * 
 */
App.renameLinkByLinkCategoryAuthor = function(event_name, selection)
{
// ( ()先頭括弧 繰り返し ) ( [] 繰り返し)
	var regexp_name
		= /^((?:\([^\(\)]+\) *)*)((?:\[[^\[\]]*(?:\[[^\[\]]+\][^\[\]]*)*\] *)*)(.+?)$/i;
	this.genericRenamerWithHint(
		function(orig){var r=orig.match(regexp_name);return (r&&r[1]&&r[2])?(r[1].trim()+' '+r[2].trim()):null},
		function(orig, hint){return orig.replace(regexp_name,function(m,m1,m2,m3){return hint+' '+m3.trim()})}
	);
};

/**
 * ファイル名 タイトルを揃える
 *
 * 【クリックされたファイルの(○○) [△△] □□の□□部分】で、【選択されているファイルの□□】を揃える
 *
 *
 * 巻数話数があるものだけ
 */
App.renameLinkByLinkTitle = function(event_name, selection)
{
	var regexp_name
		= /^((?:\([^\(\)]+\) *)*(?:\[[^\[\]]*(?:\[[^\[\]]+\][^\[\]]*)*\] *)*)(.+?) *((?:v(?:ol)?[-\._]?\d+|No[-\._]\d+|[第全]\d+|ch?[-\._]?\d+|[\(\[]| *透かし[あ有]り | *(?:雑誌)?寄せ集め| *別スキャン| *単行本| 20\d\d[-年]?\d+(?:-\d+)?月?号?| \d+).*)(?:\.part\d+\.rar|\.zip|\.[0-9a-z]{2,6})?$/i;
	this.genericRenamerWithHint(
		function(orig){var r=orig.match(regexp_name);return r?r[2]:null;},
		function(orig, hint){return orig.replace(regexp_name,function (m,m1,m2,m3){return m1.trim()+' '+hint.trim()+' '+m3.trim();});}
	);
};

/**
 * ファイル名 (カテゴリ)[作者名]タイトルまで揃える
 *
 * 【クリックされたファイルの(○○) [△△] □□】で、【選択されているファイル】を揃える
 *
 *
 * 巻数話数があるものだけ
 */
App.renameLinkByLinkLongTitle = function(event_name, selection)
{
	var regexp_name
		= /^((?:\([^\(\)]+\) *)*(?:\[[^\[\]]*(?:\[[^\[\]]+\][^\[\]]*)*\] *)*.+?) *((?:v(?:ol)?[-\._]?\d+|No[-\._]\d+|[第全]\d+|ch?[-\._]?\d+|[\(\[]| *透かし[あ有]り | *(?:雑誌)?寄せ集め| *別スキャン| *単行本| 20\d\d[-年]?\d+(?:-\d+)?月?号?| \d+).*)(?:\.part\d+\.rar|\.zip|\.[0-9a-z]{2,6})?$/i;
	this.genericRenamerWithHint(
		function(orig){var r=orig.match(regexp_name);return r?r[1]:null;},
		function(orig, hint){return orig.replace(regexp_name,function(m,m1,m2){return hint.trim()+' '+m2.trim()});}
	);
};

//
// [パッケージ内リネーム系]
//

// 渡されたリンクの配列の中で、同一パッケージがないリンクの配列を返す
function getLinksOnlySingleLink(ls)
{
	var pu = {};
	ls.forEach(function(l){pu[l.package.UUID]=(pu[l.package.UUID]||0)+1});
	return ls.filter(function(l){return 1 === pu[l.package.UUID]});
}

// 渡されたリンクの配列→{パッケージUUID:[Link1,Link2, ...]}
function getLinksPackageStruct(ls)
{
	return ls.reduce(function(a,l){a[l.package.UUID]?a[l.package.UUID].push(l):(a[l.package.UUID]=[l]);return a},{});
}

function findExt(p){var ext='';return p.downloadLinks.some(function(l){return ext=getExt(l.getName())}),ext}

/**
 * このリンクの名前でパッケージ内をリネーム
 *
 * 【右クリックされた項目】--- (複数パッケージを同時処理するため)
 *
 * 【選択されている項目】
 *     『選択されたリンクのファイル名』で、パッケージ名と
 *     そのパッケージ内全リンクの名前を揃える。
 *
 * ※ 各パッケージ内で「リンクは一つだけ選択」する。
 *    二つ以上のリンクが選択されたパッケージはリネームしない。
 *    拡張子は維持。
 *
 * ※ デフォルトパッケージ名『様々なファイル』『任意』のパッケージはリネームしない。
 *    リネームしたければパッケージ名を先に変更しておく。
 *
 * ※ App.config.RENAME_ALIGN_FILEEXTENSION で設定されているファイル拡張子以外
 *    のリンクを含む場合は、そのパッケージは処理をスキップする。
 *    （希に連番画像ファイルを同じファイル名にリネームする事故が起こるため……）
 */
App.renamePackageAndLinksByContextLinkName = function(event_name, selection)
{
	const DEFAULT_EXTENSION = this.config.DEFAULT_EXTENSION;
	const RENAME_ALIGN_FILEEXTENSION = this.config.RENAME_ALIGN_FILEEXTENSION;
	
	var is_ext_ok = new RegExp('^(?:|.*\.(?:'+RENAME_ALIGN_FILEEXTENSION.join('|')+'))$','i');
	
	getLinksOnlySingleLink(selection.links).forEach(function(orig_l)
	{
		var p = orig_l.package;
		var new_name = getFileSpec(orig_l.getName());

		// リネーム元リンクの名前が無い || デフォルトパッケージ名ならスキップ
		if (! new_name || this.isAutoCreatedPackageName(p.getName())) return;
		
		// 拡張子無しに付与するデフォルト拡張子を取得
		var default_ext = getExt(orig_l.getName()) || findExt(p) || DEFAULT_EXTENSION;

		// 許容する拡張子以外を含んでいればパッケージスキップ確認
		// 連番画像ファイルなど事故防止
		var is_bad_ext = p.downloadLinks.some(function(x){return !is_ext_ok.test(getExt(x.getName()))});
		if (is_bad_ext && !this.confirm(
				this.jdFormat('RENAME_LINKS_BY_MSG',['RENAME_PACKAGE_AND_LINKS_BY_CONTEXTLINKNAME',p.getName()]),
				'YES','NO'))
			return;

		// パッケージをリネーム
		p.setName(new_name);

		// パッケージ内の全リンクをリネーム
		p.downloadLinks.forEach(function(l)
		{
			//リネーム元リンクをスキップ
 			if (l.UUID == orig_l.UUID) return;
 			
			// リンクをリネーム
			l.setName( new_name + (getExtFull(l.getName())||default_ext) );
		});
	},this);
};

/**
 * パッケージ名で名前を揃える
 *    『パッケージ名』で『パッケージ内全ファイルの名前』を揃える
 *     /^様々なファイル/ なパッケージではリネームしない
 *
 * 【右クリックされた項目】---
 *
 * 【選択されている項目】
 *     リンクが選択された場合、親パッケージが対象になる
 *
 * ※ デフォルトパッケージ名『様々なファイル』『任意』のパッケージはリネームしない。
 *    リネームしたければパッケージ名を先に変更しておく。
 *
 * ※ App.config.RENAME_ALIGN_FILEEXTENSION で設定されているファイル拡張子以外
 *    のリンクを含む場合は、そのパッケージは処理をスキップする。
 *    （希に連番画像ファイルを同じファイル名にリネームする事故が起こるため……）
 */
App.renameLinksByPackageName = function(event_name, selection)
{
	const DEFAULT_EXTENSION = this.config.DEFAULT_EXTENSION;
	const RENAME_ALIGN_FILEEXTENSION = this.config.RENAME_ALIGN_FILEEXTENSION;
	
	var is_ext_ok = new RegExp('^(?:|.*\.(?:'+RENAME_ALIGN_FILEEXTENSION.join('|')+'))$','i');

	selection.packages.forEach(function(p)
	{
		var new_name = p.getName();
		
		// パッケージ名無しか、デフォルトパッケージ名ならスキップ
		if (! new_name || this.isAutoCreatedPackageName(p.getName())) return;

		// 拡張子無しに付与するデフォルト拡張子を取得
		var default_ext = findExt(p) || DEFAULT_EXTENSION;
		
		// 許容する拡張子以外を含んでいればパッケージスキップ確認
		// 連番画像ファイルなど事故防止
		var is_bad_ext = p.downloadLinks.some(function(x){return !is_ext_ok.test(getExt(x.getName()))});
		if (is_bad_ext && !this.confirm(
				this.jdFormat('RENAME_LINKS_BY_MSG',['RENAME_LINKS_BY_PACKAGENAME',p.getName()]),
				'YES','NO'))
			return;
		
		// パッケージ内の全リンクをリネーム
		p.downloadLinks.forEach(function(l)
		{
			// リンクをリネーム
			l.setName( new_name + (getExtFull(l.getName())||default_ext) );
		});
	},this);
};

/**
 * ファイル名から作者名またはタイトルを返す
 *
 * @param {string} filename ファイル名
 * @param {number} part 部分を指定する
 * @param {[string='|']} delim 該当するものが複数だった場合に、結合するための区切り文字
 * @returns {string} 指定された部分を切り出して返す
 */
function getKeywordFromFilename(filename, part, delim)
{
	var search_word = '';
	var r = filename.match(/^(?:(?:\([^\(\)]+?\) *)*(?:\[([^\]]+)\] *)?)?((?:(?:COMIC|\u30B3\u30DF\u30C3\u30AF) *)?([a-z]+(?: [a-z]+?)*?(?:$|\.|(?= v\d+))|(?:[-+ a-z]+)+|[^ －]+))/i);
	if (r)
		if (part == findBy.title
			|| (r[1] && (r[1] == '\u30A2\u30F3\u30BD\u30ED\u30B8\u30FC'
			|| r[1] == '\u96D1\u8A8C')))
			search_word = r[2].replace(/(?:[!?！？。、]+)$/,'');//検索ワードの末尾感嘆符などは不要
		else if (r[1])
		{
			if (part == findBy.author)
				search_word = r[1].split(/\u00D7|\uFF06|\uFF0F/).join((delim===undefined) ? '|' : delim);
			else if (part == findBy.author_1st)
				search_word = (r[1].split(/\u00D7|\uFF06|\uFF0F/))[0];
		}
	return(search_word.trim());
}

/**
 * ブラウザを開く個数が設定上限を超えているかどうか、
 *     超えていた場合、確認メッセージボックスを出して
 *     制限を超えて開くかどうかYES/NOの結果をboolで返す
 *
 * @param {number} url_count 上限数
 * @returns {boolean} true=YES/false=NO|cancel
 */
App.confirmAboutOpenBrowserCount = function(url_count)
{
	const MAX_OPEN = this.config.OPEN_BROWSER_MAX;
	if (url_count == 0) return false;
	if (url_count <= MAX_OPEN) return true;
	
	return this.confirm(
		this.jdFormat('CONFIRM_OPEN_BROWSER_WITH_TOO_MANY_URLS', [url_count]),
		'OK',
		'CANCEL'
	);
};

App.internalOpenUrls = function(urls)
{
	const INTERVAL_TIME = this.config.OPEN_BROWSER_INTERVAL;
	const BROWSER_PATH = this.config.path.browser;
	
	if (!isArray(urls)) return; 
	var us = urls.filter(xDup);
	if (us.length === 0) return 0;
	if (!this.confirmAboutOpenBrowserCount(us.length)) return;
	us.forEach(function(url,i)
	{
		if (i) sleep(INTERVAL_TIME);
		callSync( BROWSER_PATH, DQ(url) );
	});
	return us.length;
};

/**
 * WEBブラウザで検索
 *
 * 選択されたリンクのファイル名から検索ワードを取得して、重複を取り除いた後、ブラウザで検索
 *
 *
 * ESL連想配列に
 * {"メニュー名":["URL(%REP%をキーワードに置換して引数として渡す)", position(findBy.author|findBy.title)]}
 *   メニュー名は、リストビューのコンテキストメニュー（右クリックメニュー）での名前
 *   URLは、"https://www.google.com/?q=%REP%"で、%REP%を検索ワードに置換してブラウザに渡す
 *   positionは、ファイル名から取得する検索ワードの位置。
 */
App.searchOnWEBSite = function(event_name, selection)
{
	const search_table = this.config.SEARCH_WEB;
	if (! search_table[event_name])
	{
		// テーブル内にevent_nameが無い場合、
		// テーブル内にリソース名があれば全言語に変換してチェック
		if (!keys(search_table).some(function(n)
		{
			// リソーステーブルのKEY名ではない文字を含んでいれば次へ
			if (!/^[\dA-Z_\.]+$/.test(n)) return false;
			
			return this.resource.getLanguages().some(function(lng)
			{
				if (this.getResource(n,lng) != event_name) return false;
				event_name = n;
				return true;
			},this);
		},this))
			return false;
	}
	
	var parttype = search_table[event_name][0];
	var template_url = (search_table[event_name][1] || ('https://'+event_name+'/?s=%REP%'));
	var items = [];
	
	// 選択されたリンク.親が展開されているか?そのリンクから検索ワード:親の名前から検索ワード
	selection.links.forEach(function (l)
	{
		const n = l.package.expanded ? l.getName() :l.package.getName();
		if (n == '' || this.isDefaultPackageName(n))
			return;
		var search_word = getKeywordFromFilename(n, parttype, ' ');
		if (parttype != findBy.title && search_word == '')
			search_word = getKeywordFromFilename(n, findBy.title);
		
		if (search_word != '') items.push(template_url.replace("%REP%", search_word));
	}, this);

	return this.internalOpenUrls(items);
};

/**
 * 指定リンク(l)のURLがホスト名パターンの配列(pat)にマッチするか否か
 *
 * @param {object} l リンク
 * @param {RegExp[]} pat ホスト名にマッチングさせる正規表現オブジェクトの配列
 * @return {boolean} true=マッチした、false=マッチしなかった
 */
function isLinkURLMatched(l,pat)
{
	return pat.some(function(m){return m.test(getxUrl(l))})
}

/**
 * 指定パッケージ(pack)内のホスト名パターン(pattern)にマッチするリンクを有効/無効(enabled)にする
 *（マッチしないパッケージでは何もしない）
 *
 * @param {object} p パッケージ
 * @param {RegExp|RegExp[]} pattern ホスト名にマッチングさせる正規表現オブジェクトもしくはその配列
 * @param {boolean=true} enabled true=有効,false=無効
 * @return {boolean} true=マッチした、false=マッチしなかった
 */
App.setEnablePackageByPattern = function(p, pattern, enabled)
{
	const patList = isArray(pattern)?pattern:[pattern];
	if (enabled===undefined) enabled = true;
	
	// デフォルトパッケージ名、パターンにマッチしないパッケージはスキップ
	if (this.isDefaultPackageName(p.getName()) || ! p.downloadLinks.some(function(l){return isLinkURLMatched(l, patList)}))
		return false;
	
	// パターンにマッチするか否かでリンクを有効/無効
	p.downloadLinks.forEach(function(l){l.setEnabled(isLinkURLMatched(l, patList) ? !!enabled : !enabled)});
	return true;
};

/**
 * 優先ホスト(単一)のみを有効化する
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】選択パッケージ内のリンクをルールに合わせて有効/無効化する
 *
 */
App.enableLinksMyRuleSingle = function(event_name, selection)
{
	selection.packages.forEach(function(p) {	// パターンリスト上位からマッチング
		this.config.priorityHostRule.some(function(pat){return this.setEnablePackageByPattern(p, pat)},this)
	},this);
};

/**
 * 選択されたパッケージ内でホスト名パターン(pattern)にマッチするリンクを有効/無効(enabled)にする
 *（マッチしないパッケージでは何もしない）
 *
 * @param {RegExp|RegExp[]} pattern ホスト名にマッチングさせる正規表現オブジェクトもしくはその配列
 * @param {boolean=true} enabled true=有効,false=無効
 */
App.setEnableSelectedPackagesByPattern = function(selection, pattern, enabled)
{
	selection.packages.forEach(function(p){this.setEnablePackageByPattern(p, pattern, enabled)},this)
}

/**
 * 優先ホスト(複数)のみを有効化する
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】選択パッケージ内のリンクをルールに合わせて有効/無効化する
 *
 */
App.enableLinksMyRuleMultiple = function(event_name, selection)
{
	this.setEnableSelectedPackagesByPattern(selection, this.config.priorityHostRule);
};

/**
 * 指定ホストを無効化する（hogehoge.comを無効化する）
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】選択パッケージ内の指定したホスト名にマッチしたリンクを無効化する
 *
 */
App.disableLinksByHost = function(event_name, selection)
{
	const regexp = new RegExp('^(?:ht|f)tps?://[^/]*' + event_name.replace(/\./g,'\\.').trim() + '/');

	selection.links.forEach(function(l)
	{
		if (regexp.test(getxUrl(l)))
			l.setEnabled(false);
	},this);
//	this.setEnableSelectedPackagesByPattern(selection, new RegExp('^(?:ht|f)tps?://[^/]*' + event_name.replace(/\./g,'\\.').trim() + '/'), false);
};

/**
 * 指定ホストのみを有効化する（他は無効化する）
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】選択パッケージ内の指定したホスト名にマッチしたリンク以外を無効化する
 *
 */
App.enableLinksByHostOnly = function(event_name, selection)
{
	this.setEnableSelectedPackagesByPattern(selection, new RegExp('^(?:ht|f)tps?://[^/]*' + event_name.replace(/\./g,'\\.').trim() + '/'), true);
};


/**
 * ブラウザで開く
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】リンクのcontentURLをブラウザで開く
 *
 * RegExp url_regexp = (NULL | 正規表現オブジェクト) マッチングするURLのみを開く
 */
App.openLink = function(event_name, selection)
{
	this.openLinkByPattern(selection);
};

App.openLinkByPattern = function(selection, url_regexp)
{
	var items = selection.links.map(getxUrl);
	if (isRegExp(url_regexp))
		items = items.filter(function(url){return url_regexp.test(url)});
	this.internalOpenUrls(items);
};

/**
 * 指定されたホストを含むリンクのみをブラウザで開く
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】event_nameで指定されたホスト名をcontentURLに含むリンクのみブラウザで開く
 */
App.openLinksOnlyByHost = function(event_name, selection)
{
	this.openLinkByPattern(selection, new RegExp('^(?:ht|f)tps?://[^/]*' + event_name.replace(/\./g,'\\.').trim() + '/'));
};

/**
 * 選択されたリンクの登録元ページをブラウザで開く
 *
 * 【右クリックされた項目】---
 * 【選択されている項目】リンクのプロパティSOURCE_URLに設定されているURLをブラウザで開く
 */
App.openSourceURL = function(event_name, selection)
{
	const prop_name = 'SOURCE_URL';
	var regexp_is_url_ok = /^https?:\/\//;
	this.internalOpenUrls(
		selection.links.reduce(function(a,l){
			var u=l.getProperty(prop_name);
			u && regexp_is_url_ok.test(u) && a.push(u);
			return a;
		},[])
	);
};



/**
 * Everythingで検索（作者名）
 *
 * 【右クリックされた項目】パッケージorリンクの名前から最初の[]内の単語をEverythingで検索
 * 【選択されている項目】---
 *
 * ※ 複数項目は不要
 */
App.openEverythingByAuthorName = function(event_name, selection)
{
	this.openEverything(selection, findBy.author)
};

/**
 * Everythingで検索（タイトル）
 *
 * 【右クリックされた項目】パッケージorリンクの名前から最初の[]の後ろの単語をEverythingで検索
 * 【選択されている項目】---
 */
App.openEverythingByTitle = function(event_name, selection)
{
	this.openEverything(selection, findBy.title)
};

App.openEverything = function(selection, part)
{
	const contextItem = getContextItemByContextType(selection);
	if (!contextItem) return;
	
	const search_word = getKeywordFromFilename(getFileSpec(contextItem.getName()), part||findBy.author);
	if (!search_word) return;
	
	callSync( this.config.path.everything, '-s', DQ(search_word) );
};

/**
 * 同じ名前のパッケージをまとめる
 *
 *
 * 【右クリックされた項目】---
 *
 * 【選択されている項目】選択されているパッケージで同じ名前のものがあればまとめる
 */
App.moveSameNamePackagesToPackage = function(event_name, selection)
{
	var duptable = {};
	var hitnames = {};
	selection.packages.forEach(function(x)
	{
		var n = x.getName();
		if (n in duptable)
		{
			duptable[n].push(x.UUID);
			hitnames[n] = duptable[n];
		}
		else
			duptable[n] = [x.UUID];
	});
	
	for (var x in hitnames)
	{
		var link_uuids = [];
		const p_uuids = hitnames[x];
		for (var i=1; i < p_uuids.length; i++)
		{
			const p = (this.CTX.getPackageByUUID)(p_uuids[i]);
			if (!p) continue;
			
			Array.prototype.push.apply(link_uuids, p.downloadLinks.map(xUUID));
		}
		
		if (link_uuids.length!==0)
			this.CTX.moveLinks(link_uuids, null, p_uuids[0]);
	}
};


/**
 *
 * この名前を使用して新しいパッケージに移動
 *
 * 【右クリックされた項目】
 * 　　名前/ダウンロードフォルダを新しいパッケージ名に使用
 * 　　取得できなければ何もしない
 *
 * 　　※既存パッケージ名が使用された場合は、既存パッケージへの移動に切替
 *
 * 【選択されている項目】
 * 　　選択されているリンクやパッケージを新しいパッケージに移動
 * 　　パッケージのみが選択されている項目でもパッケージ内のリンク全てが移動の対象
 *
 */
App.moveToNewPackageWithFileName = function(event_name, selection)
{
	const IS_EXPAND_AFTER_MOVED = !!this.config.EXPAND_AFTER_NEWPACKAGE;
	const EXPAND_WAITTIME = this.config.WAITTIME_FOR_EXPAND_PACKAGE;
	
	var new_name = '';
	var new_p = null;
	var dlpath = null;
	var context_package_UUID = -1;			// 新規パッケージの位置用
	var prev_context_package_UUID = -1;		// 新規パッケージの位置用予備
	
	if (selection.isLinkContext())
	{
		new_name = getFileSpec(selection.contextLink.getName());
		dlpath = selection.contextLink.package.downloadFolder;
		context_package_UUID = selection.contextLink.package.UUID;
	}
	else if (selection.isPackageContext())
	{
		new_p = selection.contextPackage;
		new_name = new_p.getName();
		dlpath = new_p.downloadFolder;
		context_package_UUID = new_p.UUID;
	}
	if (new_name == '') return;


	// パッケージ新規作成後の移動先の予備を取得
	var all_p = this.CTX.getAllPackages();
	var prev = 0;
	if (all_p.some(function(p)
	{
		if (p.UUID == context_package_UUID)
			return true;
		prev = p.UUID;
	}))
	{
		prev_context_package_UUID = prev;
	}
	
	// パッケージが右クリックされていたら、そのパッケージnew_pを使い
	// リンクが右クリックされていたら、既存パッケージ名ならそのパッケージを使う
	if (! new_p)
		new_p = all_p.find(function(p){return p.getName()==new_name});

	var items = selection.links.map(xUUID);
	
	if (new_p)
	{	// 既存パッケージにリンクを移動
		this.CTX.moveLinks(items, null, new_p.UUID);
		if (context_package_UUID != -1)
		{
			sleep(10);
			this.CTX.movePackages([new_p.UUID], context_package_UUID);
		}
	}
	else
	{	// 新規パッケージにリンクを移動
		this.CTX.movetoNewPackage(items, null, new_name, dlpath);
		sleep(10);
		
		var l = (this.CTX.getLinkByUUID)(items[0]);
		this.CTX.movePackages(
			[l.package.UUID],
			this.CTX.getPackageByUUID(context_package_UUID)	// 右クリックされたアイテムのパッケージがリンクの移動に伴って消滅しているか判定
				? context_package_UUID
				: prev_context_package_UUID
		);
	}
	
	if (IS_EXPAND_AFTER_MOVED)
	{
		sleep(EXPAND_WAITTIME);
		l.package.setExpanded(true);
	}
};


///// ソート関連 /////

function getAuthorsString(s)
{
	const exp_getAuthor = /^(?:\([^\)]+\) *)*\[([^\]]+)\] .+$/;
	const r = s.match(exp_getAuthor);
	if (!r) return '';
//	return r[1].split(/[×＆、,，]/).map(function(a){return a.trim()}).filter(function(a){return !!a}).sort().join('×');
//	return r[1].split(/[×＆、,，]/, 2).map(function(a){return a.trim()}).filter(function(a){return !!a}).sort().join('×');
	return r[1].split(/[×＆、,，]/, 2).map(function(a){return a.trim()}).filter(function(a){return !!a}).join('×');
}

function getCategoryString(s)
{
	const exp_getCategory = /^(\([^\)]+\))/;
	const r = s.match(exp_getCategory);
	return r?r[1]:'';
}

/**
 * パッケージを並べ替える（画面上も）
 *
 * @param {(object,object)=>number} condition ソート関数に渡すコールバック関数
 */
App.sortPackages = function(condition)
{
	var packs = this.getSelection().packages;
	if (packs.length <= 1) packs = this.CTX.getAllPackages();
	if (packs.length <= 1) return;
	
	packs.sort(condition.bind(this));
	
	for (var i=1; i<packs.length;++i)
		this.CTX.movePackages([packs[i].UUID], packs[i-1].UUID);
};

/**
 * 作者順に並べ替え
 *
 * sortPackagesByAuthor*
 */
function sortfunc_CompareAuthorA(a,b)
{
	const author_a = getAuthorsString(a.name);
	const author_b = getAuthorsString(b.name);
	return author_a.localeCompare(author_b, LANGUAGE_JA);	// 原則日本語ファイル名に対応
}
function sortfunc_CompareAuthorB(a,b){return sortfunc_CompareAuthorA(b,a)}
App.sortPackagesByAuthorAscending  = function(){this.sortPackages(sortfunc_CompareAuthorA)};
App.sortPackagesByAuthorDescending = function(){this.sortPackages(sortfunc_CompareAuthorB)};

/**
 * タイトル順に並べ替え
 *
 * sortPackagesByTitle
 */
function sortfunc_CompareTitleA(a,b)
{
	/** @type {RegExp} 先頭から続く(～～)[～～]を削除するパターン */
	const exp_getTitle = /^(?:\([^\)]+\) *|\[[^\]]+\] *)*/;
	const title_a = a.name.replace(exp_getTitle, '');
	const title_b = b.name.replace(exp_getTitle, '');
	
	return title_a.localeCompare(title_b, LANGUAGE_JA);	// 原則日本語ファイル名に対応
}
function sortfunc_CompareTitleB(a,b){return sortfunc_CompareTitleA(b,a)}
App.sortPackagesByTitleAscending  = function(){this.sortPackages(sortfunc_CompareTitleA)};
App.sortPackagesByTitleDescending = function(){this.sortPackages(sortfunc_CompareTitleB)};

/**
 * カテゴリ別作者順に並べ替え
 *
 * sortPackagesByAuthor*
 */
function sortfunc_CompareCategoryAuthorA(a,b)
{
	const categoryauthor_a = getCategoryString(a.name)+getAuthorsString(a.name);
	const categoryauthor_b = getCategoryString(b.name)+getAuthorsString(b.name);
	return categoryauthor_a.localeCompare(categoryauthor_b, LANGUAGE_JA);	// 原則日本語ファイル名に対応
}
function sortfunc_CompareCategoryAuthorB(a,b){return sortfunc_CompareCategoryAuthorA(b,a)}
App.sortPackagesByCategoryAuthorAscending  = function(){this.sortPackages(sortfunc_CompareCategoryAuthorA)};
App.sortPackagesByCategoryAuthorDescending = function(){this.sortPackages(sortfunc_CompareCategoryAuthorB)};

/**
 * カテゴリ別タイトル順に並べ替え
 *
 * sortPackagesByCategoryTitle
 */
function sortfunc_CompareCategoryTitleA(a,b)
{
	/** @type {RegExp} 先頭から続く(～～)[～～]を削除するパターン */
	const exp_getTitle = /^(?:\([^\)]+\) *|\[[^\]]+\] *)*/;
	const categorytitle_a = getCategoryString(a.name)+a.name.replace(exp_getTitle, '');
	const categorytitle_b = getCategoryString(b.name)+b.name.replace(exp_getTitle, '');
	
	return categorytitle_a.localeCompare(categorytitle_b, LANGUAGE_JA);	// 原則日本語ファイル名に対応
}
function sortfunc_CompareCategoryTitleB(a,b){return sortfunc_CompareCategoryTitleA(b,a)}
App.sortPackagesByCategoryTitleAscending  = function(){this.sortPackages(sortfunc_CompareCategoryTitleA)};
App.sortPackagesByCategoryTitleDescending = function(){this.sortPackages(sortfunc_CompareCategoryTitleB)};


/**
 * 追加日時順に並べ替え
 *
 * sortPackagesByAddedDate
 */
function sortfunc_CompareAddedDateA(a,b){return a.getAddedDate()-b.getAddedDate()}
function sortfunc_CompareAddedDateB(b,a){return a.getAddedDate()-b.getAddedDate()}
App.sortPackagesByAddedDateAscending  = function(){this.sortPackages(sortfunc_CompareAddedDateA)};
App.sortPackagesByAddedDateDescending = function(){this.sortPackages(sortfunc_CompareAddedDateB)};

/**
 * 優先ホスト順に並べ替え
 *
 * sortPackagesByMyRule
 */

function getPointByRule(l,pats)
{
	var idx = pats.length;
	pats.some(function(m, i){if (m.test(getxUrl(l))){idx=i;return true}});
	return idx;
}
function sortfunc_CompareMyRuleA(a,b)
{
	const point_a = getPointByRule(a, this.config.priorityHostRule);
	const point_b = getPointByRule(b, this.config.priorityHostRule);
	return (point_a == point_b)
		? sortfunc_CompareCategoryTitleA(a,b)
		: (point_a - point_b);
}
function sortfunc_CompareMyRuleB(a,b)
{
	const point_a = getPointByRule(a, this.config.priorityHostRule);
	const point_b = getPointByRule(b, this.config.priorityHostRule);
	return (point_a == point_b)
		? sortfunc_CompareCategoryTitleA(b,a)
		: (point_b - point_a);
}
App.sortPackagesByMyRuleAscending=function()
{
	this.sortPackages(sortfunc_CompareMyRuleA)
};
App.sortPackagesByMyRuleDescending=function()
{
	this.sortPackages(sortfunc_CompareMyRuleB);
};

///// リンクグラバーへの追加関連 /////

/**
 * リンクからリンクへ情報をコピーする
 * 
 * @param {number} xUUID 情報コピー元リンクのUUID（コンテキストに応じたDownloadLinkかCrawledLink）
 * @param {number} cUUID 情報コピー先リンクのUUID（CrawledLinkのみ）
 * @returns {boolean} true:成功、false:失敗
 */
App.copyXLinkToCLink = function(xUUID, cUUID)
{
	var xl = this.CTX.getLinkByUUID(xUUID);
	var cl = this.LGC.getLinkByUUID(cUUID);
//alert({xl:xl,cl:cl});
	if (!xl || !cl) return false;

	// Copy Link properties
	// link.getProperties() returns "Map" Embed Java Object.
	// props.keySet() returns "Set" Embed Java Object.
	// props.keySet().toArray() returns object is abled to use as Array
	// props.get(key) returns a value of key
	var props = xl.getProperties();
	if (props)
	{
		props.keySet().toArray().forEach(function(k){
			// without JOB_ID, old jobId is not available.
			if (k == 'JOB_ID') return;
			var v = props.get(k);
			
				// link.setProperty() does not support Object
			if (typeof v === 'object')
				return;
			
			cl.setProperty(k, v);
		});
	}
	
	// Copy link comment
	if (xl.comment)
	{
		cl.comment = xl.comment;
	}
	
	// Copy package comment
	if (xl.package.comment && !cl.package.comment)
	{
		cl.package.comment = xl.package.comment;
	}
	
	// Copy link priority
	cl.priority = xl.priority;
	
	// Copy link enabled state
	if (xl.isEnabled() != cl.isEnabled())
	{
		cl.setEnabled(xl.isEnabled());
	}
	
	// Copy link name
	cl.setName(xl.getName());
	return true;
};

/**
 * リンク追加時のオンラインチェックの有効/無効設定
 *
 * @param {boolean} enabled true:有効、false:無効
 * @returns {boolean} 前の設定状態を返す
 */
function setDoLinkCheck(enabled)
{
	var old = callAPI("config", "get", "jd.controlling.linkcollector.LinkCollectorConfig", null, "DoLinkCheck");
	if (old != enabled)
		callAPI("config", "set", "jd.controlling.linkcollector.LinkCollectorConfig", null, "DoLinkCheck", enabled);
	return old;
}

/**
 * 渡されたアイテムからURLの配列を返す
 * ( APIが返したCrawledLink | CrawledLinkオブジェクト | URL文字列 )のいずれかを受け取って
 * ダウンロード先を指すURLの配列を返す（登録時のURLと同一であるものがどれか分からないため候補を複数返す）
 */

App.getXItemUrls = function(item)
{
	var urls = [];
	var x = item;
	if (x.uuid !== undefined) // api link
	{
		if (x.url)
			urls.push(x.url);
		var tmp = this.LGC.getLinkByUUID(x.uuid)||this.DLC.getLinkByUUID(x.uuid);
		if (tmp)
			x = tmp;
	}
	if (x.UUID)	// JD Link Object
	{
		['pluginURL','contentURL','originURL'].forEach(function(p){
			if (x[p]) urls.push(x[p]);
		});
		['URL_CONTENT','ORIGIN_URL'].forEach(function(p){
			var t = x.getProperty(p);
			if (t) urls.push(t);
		});
	}
	else if (isString(x))
		urls.push(x);
	
	return urls.map(function(u){return u.replace(/#.*$/,'')}).filter(xDup);
//	return urls;
};

/**
 * crawlerJobの中止
 * @param {number[]} jobIds JOB IDの配列
 */
App.abortJob = function(jobIds)
{
	jobIds.forEach(function(j){this.LGC.abort(j)},this);
};

/**
 * リンクグラバーへ再登録
 *
 * 選択されているリンクを全てリンクグラバーに追加
 * （パッケージ選択時はパッケージ内全リンク）
 * 
 * ※ リンクグラバーの登録処理時間が異常に長過ぎた場合、
 *    登録後のファイル名の設定をせずにスクリプトを終了
 */
App.addLinksToLinkGrabber = function(event_name, selection)
{
	// 
	// 「URL→選択されたリンクのテーブルを用意」
	// 「重複URLは排除」
	//
	const sellinks = selection.links;
	if (0 == sellinks.length) return;
	const selpacks = selection.packages;
	const check_interval = 500;
	const limit_time = (sellinks.length * 2000 + 10000) + getCurrentTimeStamp();
	
	var jobid_list = Object.create(null);
	var url_map = Object.create(null);// url to downloadLink's UUID map
	var dupUrlIdx_set = Object.create(null);// duplicated url index set
	var packed_sellinks = Object.create(null);
	var cl_to_xl = Object.create(null);
	var is_aborted = false;
	
	// URLの重複チェック+URLtoDL.UUIDの変換テーブル作成
	sellinks.forEach(function(x,i){
		if (url_map[getxUrl2(x)])
		{
			dupUrlIdx_set[i] = 1;
			return;
		}
		
		url_map[getxUrl2(x)]={UUID:x.UUID, packageUUID:x.package.UUID};
		packed_sellinks[x.package.UUID] 
			? packed_sellinks[x.package.UUID].push(x)
			: (packed_sellinks[x.package.UUID]=[x]);
	});
	
	// 確認 URLの重複無視で処理続行
	if (keys(dupUrlIdx_set).length !== 0)
	{
		if (this.confirm('ADDLINKSTOLINKGRABBER_IGNORE_DUP_URL','CONTINUE','ABORT'))
			return false;c
	}
	
	// 一時的にオンラインチェックを止める
	//Settings > Advanced Settings > LinkCollector.dolinkcheck > Disable
	var old_islinkcheck = setDoLinkCheck(false);
	
	try {
		// 
		// パッケージ単位で一気にaddLinks
		// 
		selpacks.forEach(function(xp,i)
		{
			// パッケージxp内のURL重複分を省いた『選択されているリンクのリスト』
			var xp_links = packed_sellinks[xp.UUID];
			if (xp_links.length === 0) return;
			
			var jobid = this.LGC.addLinks({
				links: xp_links.map(getxUrl).join('\r\n'),
				packageName: xp.getName(),
				overwritePackagizerRules: true,
				destinationFolder: xp.downloadFolder,
				deepDecrypt: false,
				assignJobID: true,	// assignJobID FAQ = https://support.jdownloader.org/en/knowledgebase/article/use-jobids-to-keep-link-references
			});
			if (!jobid) return;
			jobid_list[jobid.id] = xp_links.map(getxUrl);
		}, this);
		if (0 === keys(jobid_list).length) return;

		// require wait time
		sleep(1000);

		var all_jobs = null, addedlinks_api = null;
		// jobの完了待ちループ
		while (1)
		{
			// Timeoutエラー処理
			// Crawling中なら中断しない
			if ((!callAPI("linkcrawler","isCrawling")&&!callAPI("linkgrabberv2","isCollecting"))
				&& getCurrentTimeStamp() > limit_time)
			{
				alert('Error: Timeout App.addLinksToLinkGrabber()');
				this.abortJob(keys(jobid_list));
				is_aborted = true;
				break;
			}
			//
			// 全jobをqueryLinkCrawlerJobs
			//
			all_jobs = this.LGC.queryLinkCrawlerJobs({
				collectorInfo:true,
				jobIds:keys(jobid_list)
			});
			if (!all_jobs)
			{	// nullを返さないので通常はここに来ない
				alert('Error: queryLinkCrawlerJobs() returns null', 'Aborted');
				this.abortJob(keys(jobid_list));
				is_aborted = true;
				break;
			}
			
			//
			// 全jobの内、完了したjobからcrawledカウンターが0でないjobのみqueryLinks
			//
			var finished_jobs = all_jobs.filter(function(j){return !j.checking && !j.crawling
				&& (j.crawled||j.filtered||j.broken||j.unhandled)});
			if (finished_jobs.length)
			{
				var crawled_jobIds = finished_jobs.reduce(function(a,j){if (j.crawled||j.filtered) a.push(j.jobId);return a},[]);
//				var crawled_jobIds = finished_jobs.filter(function(j){return j.crawled||j.filtered});
				if (crawled_jobIds.length)
				{
					//
					// 完了したjobからcrawledカウンターが0でないjobのみqueryLinks
					//
					addedlinks_api = this.LGC.queryLinks({
						jobUUIDs: crawled_jobIds,
						url:true,
						uuid:true,
					});
					if (!addedlinks_api)
					{
						alert('Error: queryLinks() returns null', 'Aborted');
						this.abortJob(keys(jobid_list));
						is_aborted = true;
						break;
					}
					addedlinks_api.forEach(function(cl_api)
					{
						// リンクのURLがurl_mapに無いならスキップ
						var url = this.getXItemUrls(cl_api).find(function(u){return url_map[u]});
						if (!url) return;
						
						cl_to_xl[cl_api.uuid] = url_map[url];
//						this.copyXLinkToCLink(xl_uuid, cl_api.uuid);
						
						// 完了したリンクのURLをurl_mapから削除
						delete url_map[url];
					},this);
					
//					alert({finished_jobIds:finished_jobs.map(function(j){return j.jobId}), crawled_jobIds:crawled_jobIds, finished_jobs:finished_jobs});
				}
				else
				{
					// crawledカウンターが0、有効なリンク無し（重複リンクもここに来る）
				}
				
				// 完了したjobIdを削除
				finished_jobs.forEach(function(j){delete jobid_list[j.jobId]});
				
				// 待機中のjobIdが無ければjob完了待ちループを抜ける
				if (0===keys(jobid_list).length)
				{
					break;
				}
				if (is_aborted) break;
			}//if (crawled_jobIds.length)
			sleep(check_interval);
		}// while (1)
	}
	finally
	{
		// オンラインチェック設定復帰
		if (old_islinkcheck)
			setDoLinkCheck(old_islinkcheck);
	}
	
	if (keys(cl_to_xl).length !== 0)
	{
		// 登録元パッケージ順にソート
		var orders = {};
		selpacks.forEach(function(p,i){orders[p.UUID]=i});
		var cp_uuids = keys(cl_to_xl).map(function(cl){return this.LGC.getLinkByUUID(cl)},this)
			.sort(function(a,b){return orders[cl_to_xl[a.UUID].packageUUID] - orders[cl_to_xl[b.UUID].packageUUID]})
			.map(function(x){return x.package.UUID})
			.filter(xDup);
		for (var i=1; i<cp_uuids.length;++i)
			this.LGC.movePackages([cp_uuids[i]], cp_uuids[i-1]);
		
		// 新規リンクへ情報をコピー
		keys(cl_to_xl).forEach(function(cl_uuid){
			this.copyXLinkToCLink(cl_to_xl[cl_uuid].UUID, cl_uuid);
		},this);
		
		// オンラインチェック
//		this.LGC.startOnlineStatusCheck(null, cp_uuids);
		this.LGC.startOnlineStatusCheck(keys(cl_to_xl), null);
	}
	
	return !is_aborted;
};

App.openJDCfgFolder = function(event_name, selection)
{
	callSync( this.config.path.filer,  DQ(jdPath('cfg')) );
};


disablePermissionChecks();

///// init
App.init();
try
{
	App.setEventProperty({
		menu:menu,
		name:name,
		icon:icon,
		shortCutString:shortCutString,
	});
}
catch(e)
{
	throw Error(App.getResource('ERROR_INVALID_TRIGGER_TYPE'));
}
//alert("App.resource.getLanguages()="+App.resource.getLanguages()+"\n\n"+"App.dispatcher.getNames()=\n"+App.dispatcher.getNames().join('\n')+"\n");

App.dispatch();


///// [exit script]


