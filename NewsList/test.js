let data =[
    {
        "id": 1,
        "title": "图集日本天皇即位礼皇家晚宴现场 世界政要云集0",
        "imgUrl": "http://d.ifengimg.com/w144_h80_q70/x0.ifengimg.com/ucms/2019_43/CE2E2491BDC4B405BA6354F1815737AE5F83B419_w750_h376.jpg",
        "from": "东方IC",
        "newTime": "今天 22:30"
    },
    {
        "id": 2,
        "title": "王岐山日本之行的三个特别之处0",
        "imgUrl": "http://d.ifengimg.com/w144_h80_q70/x0.ifengimg.com/res/2019/976BD8B5F4CB55CBD7D2984B15488E6EE46FF071_size25_w500_h212.jpeg",
        "from": "政知道",
        "newTime": "今天 22:22"
    },
    {
        "id": 3,
        "title": "台当局要港府协助带走陈同佳？台媒：港府的回应形同拒绝0",
        "imgUrl": "http://d.ifengimg.com/w144_h80_q70/x0.ifengimg.com/ucms/2019_43/7B62C9AB9225224C2C7F6CD9CA237F5DA05DF952_w750_h376.jpg",
        "from": "环球网",
        "newTime": "今天 22:19"
    }
]
let data1 = JSON.parse(JSON.stringify(data));
let newData = data1.splice(0,1);
console.log(data1)
console.log(data);