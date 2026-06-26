import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import Button from '@/components/units/button';
import { OuterFrame } from '@/components/units/outerFrame/index';
import Typography from '@/components/units/typography';
import { renderField } from '@/components/widgets/modalForm/indexHelper';
import { Flex, Form } from 'antd';
import { useFields } from '../../demandRp/indexConfig';
import { config } from '../indexConfig';
import { useHelpers } from './indexHelper';
import { ScopeStyle } from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

export const FormOverview = ({ events, getEventData, initialList = [] }) => {
  // const favToggle = useBoolean(false);
  const [formInstance] = Form.useForm();
  const [formSecInstance] = Form.useForm();
  const [list, setList] = useState(initialList);
  const [, setFavList] = useState([]);

  const { DemandRpFormFields } = useFields({});

  const {
    addListHandler,
    formFields,
    getDefaultValuesHandler,
    handleDelete,
    onSubmit,
  } = useHelpers({
    events,
    formInstance,
    formSecInstance,
    getEventData,
    initialList,
    list,
    setFavList,
    setList,
  });

  // useEffect(() => {
  //   getFavList();
  // }, []);

  

  const formInitialValues = getDefaultValuesHandler();

 

  return (
    <ScopeStyle>
      <RenderFormItem
        button={{
          // name: favToggle.value ? null : '新增',
          name: '新增',
          onClick: addListHandler,
        }}
        initialValues={formInitialValues}
        instance={formInstance}
        // title={favToggle.value ? '常用清單' : '新增排程'}
        title={'新增排程'}
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
        button={{
          name: '儲存',
          onClick: list?.length > 0 ? onSubmit : undefined,
        }}
        initialValues={formInitialValues}
        instance={formSecInstance}
        title="排程預覽"
      >
        {/* {favFormFields()?.map((item, idx) => (
          <Form.Item key={`form-item-${idx}`} {...item.formItemAttr}>
            {renderField(item)}
          </Form.Item>
        ))} */}
        <ul>
          {console.log('list123', list)}
          {list?.map((item, idx) => (
            <li className="list-item" key={`list-item-${idx}`}>
              <Typography
                color={color.themeBlack}
                lg={{ size: 'xs' }}
                size="sm"
                xxl={{ size: 'sm' }}
              >
                {dayjs(item.start).format('YYYY-MM-DD HH:mm')}~
                {dayjs(item.end).format('YYYY-MM-DD HH:mm')} <br />
                {config?.filter(
                  (el) => el.strategy === item.extendedProps.strategy,
                )[0]?.title ||
                  `需量反應
                  ${
                    DemandRpFormFields?.[item.extendedProps.strategy]?.title ||
                    item.extendedProps.strategy
                  }`}
              </Typography>
              <Button onClick={() => handleDelete(idx)} variant="icon">
                <Icon color={color.themeBlack} fontSize="24" icon="mdi:trash" />
              </Button>
            </li>
          ))}
        </ul>
      </RenderFormItem>
    </ScopeStyle>
  );
};

const RenderFormItem = ({
  button,
  children,
  icon,
  initialValues,
  instance,
  title,
}) => {
  return (
    <OuterFrame icon={icon} title={title}>
      <Form form={instance} initialValues={initialValues}>
        {children}
      </Form>
      {button.name && (
        <Flex className="mg-t-20" justify="center">
          <Button
            disabled={!button.onClick}
            onClick={button.onClick}
            size="md"
            type="primary"
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
