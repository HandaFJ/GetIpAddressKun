const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const ipInput = ref("");
    const ipData = ref(null);
    const errorMsg = ref("");
    let map = null;
    let marker = null;

    const initMap = (lat, lng) => {
      if (!map) {
        map = L.map("map").setView([lat, lng], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);
      } else {
        map.setView([lat, lng], 13);
      }

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
    };

    // Denoサーバーの '/api/ip' を経由せず、ブラウザから直接APIを叩く
    const fetchIpLocation = async (targetIp = "") => {
      errorMsg.value = "";
      try {
        const url = targetIp
          ? `https://ipapi.co/${targetIp}/json/`
          : "https://ipapi.co/json/";
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) throw new Error(data.reason || "取得に失敗しました");

        ipData.value = data;
        initMap(data.latitude, data.longitude);
        marker
          .bindPopup(`<b>${data.ip}</b><br>${data.city}, ${data.country_name}`)
          .openPopup();
      } catch (err) {
        errorMsg.value = err.message;
      }
    };

    onMounted(() => {
      fetchIpLocation();
    });

    return { ipInput, ipData, errorMsg, fetchIpLocation };
  },
}).mount("#app");
