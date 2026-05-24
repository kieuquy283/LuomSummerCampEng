import TeamDetailPage from './TeamDetailPage';

const introPoints = [
  'Bạn có mong muốn tổ chức một mùa hè nhiều trải nghiệm, gần gũi thiên nhiên và giàu năng lượng cho các em học sinh?',
  'Bạn muốn trực tiếp đồng hành trong các hoạt động kỹ năng sống, trò chơi tập thể và sinh hoạt hè ý nghĩa tại địa phương?',
  'Hãy đồng hành cùng Trại hè xanh phường Vĩnh Phúc trong chiến dịch tình nguyện hè năm nay!',
];

const SummerGreenPage = () => {
  return (
    <TeamDetailPage
      teamKey="green"
      introPoints={introPoints}
      projectTitle="Dự án trải nghiệm hè, kỹ năng sống và hoạt động tập thể"
      variant="accent"
    />
  );
};

export default SummerGreenPage;
