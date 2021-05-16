import Wallpaper from "../models/Wallpaper.model";

export const categoryPage = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
    const {category , page}  = args;

     const pageNow = page || 1

    // return Wallpaper.find({categoly:{$regex: "^"+category+"$", $options: 'i'}}).lean()
    const myCustomLabels = {
        totalDocs: 'itemCount',
        docs: 'itemsList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'paginator',
      };
      
      const options = {
        page: pageNow,
        limit: 1,
        customLabels: myCustomLabels,
        lean: true
      };

      const data = await Wallpaper.paginate({categoly:{$regex: "^"+category+"$", $options: 'i'}}, options, async function (err, result) {
        console.log(result)
        return result
      });
      console.log("data : ",data)
      return data
}
