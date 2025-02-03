
import pdftopic from "pdftopic";
import fs from "fs";

(async () => {
  const curriculum_vitae = fs.readFileSync('E:/loan-web/backend/public/uploads/others/1738591834410-Invoice-867A7041-0018.pdf');

  const converted_result = await pdftopic.pdftobuffer(curriculum_vitae, "all");

  converted_result.forEach((file, index) => {
      fs.writeFileSync(`./curriculum_vitae-${index}.png`, file);
  });
})();