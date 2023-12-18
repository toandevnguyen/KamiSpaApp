import 'react-native-get-random-values';
import { v4 } from 'uuid';
const mapContact = (contact) => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: v4(),
    name: name.first + ' ' + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};
//Hàm async thường được sử dụng để xử lý các tác vụ bất đồng bộ như fetch dữ liệu từ mạng, gọi API
//fetch để tìm nạp API
//await là lấy dữ liệu một tác vụ bất đồng bộ và không gây chặn luồng chính của ứng dụng.
const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const contactData = await response.json(); //đọc dữ liệu từ phản hồi HTTP và trả về một Promise. Thông thường, phản hồi HTTP từ một API sẽ chứa dữ liệu dưới dạng dữ liệu JSON.
  return contactData.results.map(mapContact);
};
const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const userData = await response.json();
  return mapContact(userData.results[0]);
};
const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();

  return mapContact(userData.results[0]);
};
export { fetchContacts, fetchUserContact, fetchRandomContact };

//Promise là một đối tượng trong JavaScript được sử dụng để thực hiện và quản lý các tác vụ bất đồng bộ. Nó đại diện cho một giá trị có thể tồn tại trong tương lai, có thể là kết quả của một tác vụ bất đồng bộ.
//await response.json(), việc sử dụng await là để đợi cho Promise được giải quyết (hoàn thành). Khi Promise được giải quyết, nó trả về dữ liệu JSON từ phản hồi HTTP (nếu thành công), hoặc trả về lỗi (nếu có lỗi xảy ra).
// Việc sử dụng Promise trong tác vụ bất đồng bộ giúp quản lý dễ dàng hơn và đảm bảo rằng luồng chính của ứng dụng không bị chặn trong quá trình thực hiện các tác vụ như gọi API, đọc dữ liệu từ tệp tin, hoặc thực hiện bất kỳ tác vụ nào mất thời gian.
