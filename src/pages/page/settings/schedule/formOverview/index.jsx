import { useEffect, useState } from 'react';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { useBoolean } from '@/hooks/useBoolean';
import { color } from '@/styles/variable/indexStyle';
import { Flex, Col, Form } from 'antd';
import Typography from '@/components/units/typography';
import Button from '@/components/units/button';
import FormInput from '@/components/units/form/input/index';
import { OuterFrame } from '@/components/units/outerFrame/index';
import { renderField } from '@/components/widgets/modalForm/indexHelper';
import { useHelpers } from './indexHelper';
import { ScopeStyle } from './indexStyle';
import { config } from '../indexConfig';

export const FormOverview = ({ events, getEventData }) => {
  // const favToggle = useBoolean(false);
  const [formInstance] = Form.useForm();
  const [formSecInstance] = Form.useForm();
  const [list, setList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [showPreviewFav, setShowPreviewFav] = useState([]);

  const {
    getFavList,
    formFields,
    favFormFields,
    handleDelete,
    addListHandler,
    onSubmit,
  } = useHelpers({
    formInstance,
    formSecInstance,
    list,
    events,
    setList,
    setFavList,
    getEventData,
  });

  // useEffect(() => {
  //   getFavList();
  // }, []);

  const showList = showPreviewFav.length > 0 ? showPreviewFav : list;

  return (
    <ScopeStyle>
      <RenderFormItem
        // title={favToggle.value ? '常用清單' : '新增排程'}
        title={'常用清單'}
        button={{
          // name: favToggle.value ? null : '新增',
          name: '新增',
          onClick: addListHandler,
        }}
        instance={formInstance}
        // icon={
        //   <Button
        //     variant="icon"
        //     className="form-icon"
        //     onClick={() => {
        //       setShowPreviewFav([]); // 切換時清空預覽用的清單
        //       favToggle.onToggle();
        //     }}
        //   >
        //     {favToggle.value ? (
        //       <Icon
        //         icon="lets-icons:back"
        //         fontSize="20"
        //         color={color.themeBlack}
        //       />
        //     ) : (
        //       <Icon icon="mdi:heart" fontSize="20" color={color.themeBlack} />
        //     )}
        //   </Button>
        // }
      >
        {/* {favToggle.value ? (
          <RenderList
            favToggle={favToggle}
            list={favList}
            getFavList={getFavList}
            setList={setList}
            date={formInstance.getFieldValue('range')}
            showPreviewFav={showPreviewFav}
            setShowPreviewFav={setShowPreviewFav}
          />
        ) : (
          formFields()?.map((item, idx) => (
            <Form.Item key={`form-item-${idx}`} {...item.formItemAttr}>
              {renderField(item)}
            </Form.Item>
          ))
        )} */}
        {formFields()?.map((item, idx) => (
          <Form.Item key={`form-item-${idx}`} {...item.formItemAttr}>
            {renderField(item)}
          </Form.Item>
        ))}
      </RenderFormItem>
      <RenderFormItem
        title="排程預覽"
        button={{
          name: '儲存',
          onClick: list?.length > 0 ? onSubmit : undefined,
        }}
        instance={formSecInstance}
      >
        {/* {favFormFields()?.map((item, idx) => (
          <Form.Item key={`form-item-${idx}`} {...item.formItemAttr}>
            {renderField(item)}
          </Form.Item>
        ))} */}
        <ul>
          {showList.map((item, idx) => (
            <li key={`list-item-${idx}`} className="list-item">
              <Typography
                xxl={{ size: 'sm' }}
                lg={{ size: 'xs' }}
                size="sm"
                color={color.themeBlack}
              >
                {dayjs(item.start).format('YYYY-MM-DD HH:mm')}~
                {dayjs(item.end).format('YYYY-MM-DD HH:mm')} <br />
                {
                  config?.filter(
                    (el) => el.strategy === item.extendedProps.strategy,
                  )[0]?.title
                }
              </Typography>
              <Button variant="icon" onClick={() => handleDelete(idx)}>
                <Icon icon="mdi:trash" fontSize="24" color={color.themeBlack} />
              </Button>
            </li>
          ))}
        </ul>
      </RenderFormItem>
    </ScopeStyle>
  );
};

const RenderFormItem = ({ title, children, button, instance, icon }) => {
  const { getDefaultValuesHandler } = useHelpers({});

  return (
    <OuterFrame title={title} icon={icon}>
      <Form form={instance} initialValues={getDefaultValuesHandler()}>
        {children}
      </Form>
      {button.name && (
        <Flex justify="center" className="mg-t-20">
          <Button
            size="md"
            type="primary"
            disabled={!button.onClick}
            onClick={button.onClick}
          >
            <Typography size="lg">{button.name}</Typography>
          </Button>
        </Flex>
      )}
    </OuterFrame>
  );
};

// const RenderList = ({
//   list,
//   date,
//   setList,
//   favToggle,
//   getFavList,
//   showPreviewFav,
//   setShowPreviewFav,
// }) => {
//   const [filteredList, setFilteredList] = useState([]);
//   const [selectedName, setSelectedName] = useState('');

//   useEffect(() => {
//     const datas = Object.entries(list)?.map(([key, value]) => {
//       return {
//         name: key,
//         data: value,
//       };
//     });
//     setFilteredList(datas);
//   }, [list]);

//   // 搜尋功能，根據輸入的文字過濾清單項目
//   const inputHandler = (e) => {
//     if (e.target.value === '') {
//       setFilteredList(filteredList);
//     } else {
//       const tempDatas = [...filteredList];
//       setFilteredList(
//         tempDatas.filter((item) =>
//           item.name.toLowerCase().includes(e.target.value.toLowerCase()),
//         ),
//       );
//     }
//   };

//   // 選擇清單項目，將對應的時間區間設定排程中
//   const selectHandler = (e) => {
//     const selected = list?.[e.target.innerText];

//     // 儲存選中的名稱以便刪除使用
//     setSelectedName(e.target.innerText);
//     if (selected) {
//       const formattedValues = selected?.map((item) => {
//         const selectedStart = `${dayjs(date[0]).format('YYYY-MM-DD')} ${item.start}`;
//         const selectedEnd = `${dayjs(date[1]).format('YYYY-MM-DD')} ${item.end}`;

//         return {
//           start: selectedStart,
//           end: selectedEnd,
//           extendedProps: {
//             ...item.extendedProps,
//           },
//         };
//       });
//       // setList(formattedValues);
//       setShowPreviewFav(formattedValues); // 顯示預覽用的清單
//     }
//   };

//   // 刪除常用清單
//   const deleteFavHandler = async () => {
//     if (selectedName) {
//       try {
//         const response = await api.post(endpoints.schedule.deleteList, {
//           name: selectedName,
//         });
//         if (response.status === 200) {
//           toast.success('刪除成功');
//           setSelectedName(''); // 刪除後清空選中的名稱
//           // 刪除後重新取得清單資料
//           getFavList();
//         }
//       } catch (error) {
//         console.error('API Error:', error);
//         toast.error('刪除失敗');
//       }
//     }
//   };

//   // // 匯入按鈕
//   // const checkedHandler = () => {
//   //   if (selectedName) {
//   //     favToggle.onFalse();
//   //     setShowPreviewFav([]); // 匯入後清空預覽用的清單
//   //     setList(showPreviewFav); // 將預覽用的清單設定到正式的清單中
//   //   }
//   // };

//   return (
//     <div className="mg-t-20">
//       <FormInput
//         inputAttr={{
//           placeholder: '請輸入項目名稱',
//           unit: (
//             <Icon
//               icon="bitcoin-icons:search-filled"
//               fontSize="20"
//               color={color.themeBlack}
//             />
//           ),
//           onChange: inputHandler,
//         }}
//       />
//       <ul onClick={selectHandler}>
//         {filteredList?.map((item, idx) => (
//           <li
//             key={`list-item-${idx}`}
//             className={`list-item ${item.name === selectedName ? 'selected' : ''}`}
//           >
//             {item?.name}
//           </li>
//         ))}
//       </ul>
//       <Flex gutter={12}>
//         <Col span={12}>
//           <Button onClick={checkedHandler} type="primary">
//             匯入
//           </Button>
//         </Col>
//         <Col span={12}>
//           <Button onClick={deleteFavHandler}>刪除</Button>
//         </Col>
//       </Flex>
//     </div>
//   );
// };
