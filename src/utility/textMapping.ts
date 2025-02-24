export const numEnToBn = (num: any) => {
  if (num === null || num === undefined) {
    return null;
  }
  return num
    ?.toString()
    .replaceAll("0", "০")
    .replaceAll("1", "১")
    .replaceAll("2", "২")
    .replaceAll("3", "৩")
    .replaceAll("4", "৪")
    .replaceAll("5", "৫")
    .replaceAll("6", "৬")
    .replaceAll("7", "৭")
    .replaceAll("8", "৮")
    .replaceAll("9", "৯")
    .replaceAll("AM", "এ এম")
    .replaceAll("PM", "পি এম")
    .replaceAll("Jan", "জানুয়ারি")
    .replaceAll("Feb", "ফেব্রুয়ারি")
    .replaceAll("Mar", "মার্চ")
    .replaceAll("Apr", "এপ্রিল")
    .replaceAll("May", "মে")
    .replaceAll("Jun", "জুন")
    .replaceAll("Jul", "জুলাই")
    .replaceAll("Aug", "আগস্ট")
    .replaceAll("Sep", "সেপ্টেম্বর")
    .replaceAll("Oct", "অক্টোবর")
    .replaceAll("Nov", "নভেম্বর")
    .replaceAll("Dec", "ডিসেম্বর")
    .replaceAll("Years", "বছর")
    .replaceAll("Months", "মাস")
    .replaceAll("Days", "দিন")
    .replaceAll("Sat", "শনিবার")
    .replaceAll("Sun", "রবিবার")
    .replaceAll("Mon", "সোমবার")
    .replaceAll("Tue", "মঙ্গলবার")
    .replaceAll("Wed", "বুধবার")
    .replaceAll("Thu", "বৃহস্পতিবার")
    .replaceAll("Fri", "শুক্রবার");
};

export const numBnToEn = (num: any) => {
  return num
    ? num
        .toString()
        .replaceAll("০", "0")
        .replaceAll("১", "1")
        .replaceAll("২", "2")
        .replaceAll("৩", "3")
        .replaceAll("৪", "4")
        .replaceAll("৫", "5")
        .replaceAll("৬", "6")
        .replaceAll("৭", "7")
        .replaceAll("৮", "8")
        .replaceAll("৯", "9")
    : num;
};
