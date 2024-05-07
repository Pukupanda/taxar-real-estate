import Image from "next/image";
import React from "react";
import AddBlogComment from "../AddBlogComment/AddBlogComment";
import moment from "moment";

function BlogComments(props) {
  return (
    <>
      <section class="pt-5 mt-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-12 col-md-12 col-lg-8">
              {props.comments?.length > 0 && <h4>Comments</h4>}
              {props.comments?.map((item, i) => (
                <div
                  class="properyList position-relative ps-5 py-3 pe-3 mb-4"
                  key={i}
                >
                  <Image
                    src={
                      item?.image?.includes("http")
                        ? item?.image
                        : "/assets/img/dummyImage.png"
                    }
                    alt=""
                    class="userImg"
                    fill
                    quality={100}
                    priority
                  />
                  <div class="mb-3 w-100">
                    <div class="d-flex justify-content-between gap-2 mb-3">
                      <h6 class="mb-0 text-capitalize">{item?.name}</h6>
                      <small>{moment(item?.createdAt).format("ll")}</small>
                    </div>
                    <p>{item?.message}</p>
                  </div>
                </div>
              ))}

              <h4>Your Comments</h4>
              <AddBlogComment
                id={props.id}
                fetchBlogDetails={props.fetchBlogDetails}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogComments;
