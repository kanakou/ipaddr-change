// HTML要素を取得する
var input = document.getElementById("input"); // 入力欄
var output = document.getElementById("output"); // 出力欄
var button = document.getElementById("button"); // ボタン

// ボタンがクリックされたときの処理を定義する
button.onclick = function() {
  // 入力欄の値を取得する
  var value = input.value;

  // 入力欄の値が空でないかチェックする
  if (value === "") {
    // 空の場合は、出力欄にメッセージを表示する
    output.value = "入力欄に値を入力してください。";
  } else {
    // 空でない場合は、入力欄の値が逆引きDNS レコードかIPアドレスか判定する
    if (value.endsWith(".ip6.arpa")) {
      // IPv6の逆引きDNS レコードの場合は、IPアドレスに変換する
      output.value = reverseDNS2IP6(value);
    } else if (value.endsWith(".in-addr.arpa")) {
      // IPv4の逆引きDNS レコードの場合は、IPアドレスに変換する
      output.value = reverseDNS2IP4(value);
    } else {
      // IPアドレスの場合は、逆引きDNS レコードに変換する
      output.value = IP2reverseDNS(value);
    }
  }
};

// IPv6の逆引きDNS レコードをIPアドレスに変換する関数を定義する
function reverseDNS2IP6(reverseDNS) {
  // レコードを"."で分割する
  var parts = reverseDNS.split(".");

  // 最初の8つの要素を除く
  parts = parts.slice(0, -8);

  // 逆順にする
  parts = parts.reverse();

  // 4つずつグループにする
  var groups = [];
  for (var i = 0; i < parts.length; i += 4) {
    var group = parts.slice(i, i + 4).join("");
    groups.push(group);
  }

  // グループを":"で結合する
  var ip = groups.join(":");

  // IPアドレスを返す
  return ip;
}

// IPv4の逆引きDNS レコードをIPアドレスに変換する関数を定義する
function reverseDNS2IP4(reverseDNS) {
  // レコードを"."で分割する
  var parts = reverseDNS.split(".");

  // 最初の2つの要素を除く
  parts = parts.slice(0, -2);

  // 逆順にする
  parts = parts.reverse();

  // グループを"."で結合する
  var ip = parts.join(".");

  // IPアドレスを返す
  return ip;
}

// IPv6アドレスの正規表現
const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

// IPv4アドレスの正規表現
const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

// IPアドレスを逆引きDNS レコードに変換する関数を定義する
function IP2reverseDNS(ip) {
  // IPv6アドレスに合致するかチェック
  if (ipv6Regex.test(ip)) {
    // IPアドレスを分割する
    var groups = ip.split(":");

    // 各グループを4桁にする
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      while (group.length < 4) {
        group = "0" + group;
      }
      groups[i] = group;
    }

    // IPアドレスを再結合する
    ip = groups.join("");

    // IPアドレスを逆順にする
    ip = ip.split("").reverse().join("");

    // IPアドレスの各桁をドットで区切る
    ip = ip.replace(/(.)/g, "$1.");

    // 末尾のドットを削除する
    ip = ip.slice(0, -1);

    // ip6.arpaを追加する
    return ip + ".ip6.arpa";
  }
  // IPv4アドレスに合致するかチェック
  else if (ipv4Regex.test(ip)) {
    // IPアドレスを分割する
    var groups = ip.split(".");

    // IPアドレスを逆順にする
    groups = groups.reverse();

    // IPアドレスを再結合する
    ip = groups.join(".");

    // in-addr.arpaを追加する
    return ip + ".in-addr.arpa";
  }
  // どちらでもない場合
  else {
    return "不正なIPアドレスです。";
  }
}
