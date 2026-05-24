import TeamDetailPage from './TeamDetailPage';

const digitalIntroPoints = [
  'Bạn có mong muốn mang kiến thức công nghệ và tư duy số đến gần hơn với các em học sinh?',
  'Bạn muốn trực tiếp đóng góp sức trẻ vào hoạt động tình nguyện hè ý nghĩa ngay tại địa phương?',
  'Hãy đồng hành cùng Đội Bình dân học vụ số phường Vĩnh Phúc trong chiến dịch tình nguyện hè năm nay!',
];

const DigitalTeamPage = () => (
  <TeamDetailPage
    teamKey="digital"
    introPoints={digitalIntroPoints}
    projectTitle="Dự án Giáo dục nâng cao năng lực số"
    variant="digital"
  />
);

export default DigitalTeamPage;
