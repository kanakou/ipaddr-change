// Geminiにて生成ここから

// nat64用のIPv6アドレスとv4アドレスを相互に変換するJS

// nat64用のプレフィックスを定義
const nat64Prefix = "64:ff9b::";

// IPv6アドレスをv4アドレスに変換する関数
function convertNat64ToV4(ipv6Address) {
  // nat64プレフィックスを除去
  const v4AddressBytes = ipv6Address.slice(nat64Prefix.length).split(":");

  // 各オクテットを10進数に変換
  const v4AddressBinary = v4AddressBytes.map(function(byte) {
    return parseInt(byte, 16);
  });

  var v4Address = new Array(4);
  
  for (let i = 0; i < 4; i+=2) {
        v4Address[0 + i] = v4AddressBinary[i/2] >>> 8;
        v4Address[1 + i] = v4AddressBinary[i/2] & 0xff;
}

  return v4Address.join(".");
}

// v4アドレスをnat64用のIPv6アドレスに変換する関数
function convertV4ToNat64(v4Address) {
  // v4アドレスをオクテットに分ける
  const v4AddressBytes = v4Address.split(".");

  // 各オクテットを16進数に変換
  const nat64AddressBytes = new Array(2);

for (let i = 0; i < 2; i++){
        v4Address[i] = v4AddressBytes[i] 
}

   v4AddressBytes.map(function(byte) {
    return byte.padStart(2, "0");
  });

  // nat64プレフィックスを付加
  const nat64Address = nat64Prefix + nat64AddressBytes.join(":");

  return nat64Address;
}

//　ここまで

button.onclick = function() {
  // 入力欄の値を取得する
  var value = input.value;

  // 入力欄の値が空でないかチェックする
  if (value === "") {
    // 空の場合は、出力欄にメッセージを表示する
    output.value = "入力欄に値を入力してください。";
  } else {
        output.value = convertNat64ToV4(value);
  }
};