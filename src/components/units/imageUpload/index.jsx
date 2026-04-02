import { useState } from "react";
import { Image, Upload } from "antd";
import { Icon } from "@iconify/react";
import ScopeStyle from "./indexStyle";
import { handleChange, handlePreview } from "./indexHelper";
import { color } from "@/styles/variable/indexStyle";
/* 
  type為read
  list:{
    imageAttr:查閱ant design Image元件屬性
  }
  imagePreviewGroupAttr:查閱ant design Image.PreviewGroup

  type為edit
  btnUpload:客製化上傳圖片ReactNode
  removeDisabledIndexs:圖片中禁用刪除按鈕的index (陣列)
  uploadAttr:查閱ant design Upload元件屬性
*/
function ImageUpload({
  btnUpload,
  className,
  imageWidth = 36,
  imageHeight = 36,
  imagePreviewGroupAttr,
  list,
  removeDisabledIndexs = [],
  type = "edit",
  uploadAttr,
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewCurrentIndex, setPreviewCurrentIndex] = useState(0);
  const [fileList, setFileList] = useState(uploadAttr?.fileList || []);
  if (removeDisabledIndexs.length > 0) {
    uploadAttr = {
      ...uploadAttr,
      showUploadList: {
        ...uploadAttr?.showUploadList,
        showRemoveIcon: (file) => {
          const index = fileList.findIndex((item) => {
            return item.uid === file.uid;
          });
          return !removeDisabledIndexs.includes(index);
        },
      },
    };
  }

  return (
    <ScopeStyle
      className={`styled-container-image-upload type-${type} ${
        className ?? ""
      }`}
      $type={type}
      $fileListLength={fileList.length}
      $imageWidth={imageWidth}
      $imageHeight={imageHeight}
      $removeDisabledIndexs={removeDisabledIndexs}
    >
      {type === "read" && (
        <Image.PreviewGroup {...imagePreviewGroupAttr}>
          {Array.isArray(list) &&
            list.map((item, index) => {
              const { imageAttr } = item;
              return (
                <Image
                  width={36}
                  height={36}
                  key={index}
                  preview={{
                    mask: (
                      <Icon
                        icon="lucide:eye"
                        fontSize={(imageAttr?.width || imageWidth) / 2}
                      />
                    ),
                  }}
                  {...imageAttr}
                />
              );
            })}
        </Image.PreviewGroup>
      )}
      {type === "edit" && (
        <>
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            listType="picture-card"
            multiple
            onPreview={(file) => {
              handlePreview(
                file,
                fileList,
                setPreviewImages,
                setPreviewCurrentIndex,
                setPreviewOpen
              );
            }}
            {...uploadAttr}
            fileList={fileList}
            onChange={(props) => handleChange(props, setFileList, uploadAttr)}
          >
            {fileList.length >= uploadAttr?.maxCount ? null : (
              <>
                {btnUpload || (
                  <span className="btn-upload">
                    <Icon
                      icon="material-symbols:upload"
                      color={color.white}
                      fontSize={20}
                    />
                  </span>
                )}
              </>
            )}
          </Upload>
          {previewImages.length > 0 && (
            <Image.PreviewGroup
              preview={{
                current: previewCurrentIndex,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                onChange: (current) => {
                  setPreviewCurrentIndex(current);
                },
                visible: previewOpen,
              }}
            >
              {previewImages.map((item) => {
                return (
                  <Image
                    key={item.id}
                    src={item.src}
                    wrapperStyle={{
                      display: "none",
                    }}
                  />
                );
              })}
            </Image.PreviewGroup>
          )}
        </>
      )}
    </ScopeStyle>
  );
}

export default ImageUpload;
