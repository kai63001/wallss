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

      const data = await Wallpaper.paginate({}, options, async function (err, result) {
        // result.itemsList [here docs become itemsList]
        // result.paginator.itemCount = 100 [here totalDocs becomes itemCount]
        // result.paginator.perPage = 10 [here limit becomes perPage]
        // result.paginator.currentPage = 1 [here page becomes currentPage]
        // result.paginator.pageCount = 10 [here totalPages becomes pageCount]
        // result.paginator.next = 2 [here nextPage becomes next]
        // result.paginator.prev = null [here prevPage becomes prev]
        // result.paginator.slNo = 1 [here pagingCounter becomes slNo]
        // result.paginator.hasNextPage = true
        // result.paginator.hasPrevPage = false
        console.log(result)
        return result
      });
      console.log("data : ",data)
      return data
}
