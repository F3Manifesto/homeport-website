import { FunctionComponent, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Slider: FunctionComponent = (): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  const imageName: string[] = [
    "slider1",
    "slider2",
    "slider3",
    "slider4",
    "slider5",
    "slider6",
    "slider7",
    "slider8",
    "slider9",
    "slider10",
    "slider11",
    "slider12",
    "slider13",
    "slider14",
    "slider15",
    "slider16",
    "slider17",
    "slider18",
    "slider19",
    "slider20",
    "slider21",
    "slider22",
    "slider23",
    "slider24",
    "slider25",
    "slider26",
    "slider27",
    "slider28",
    "slider29",
    "slider30",
    "slider31",
  ];

  const imagesURI: string[] = [
    "bafybeidborbsvjyd35vbfqfppyyky3vfug7lfm7fcfsymwcxdzoqzdga4q",
    "bafybeickr4wbfpbhnrzd7u7crqbpila7xwekf44yicc6r6ubxazt7zrray",
    "bafybeihkhfxnm76bhmsdls3umoyjwxsfbkdflcb6kltt2catcxqxdcttza",
    "bafybeicqon6ia2cobxdrmwut4iauatdbt3mjc5bx47cjagstrwmazyh3ny",
    "bafybeiheafpsmtaq622b576e7yh3u3czrau5uepuinh625yr3pv5irz23a",
    "bafybeigmkdnqatdu6sr7bhzmn35kcwvcfy3hk6f3vhzib3f3ug6xvjr35m",
    "bafybeieubpraoh63ohxrdbd4az32gpc2ukn74jdfqe4bru22zoy5ulprtm",
    "bafybeien5lmpwcdetfvbubukor4ocf77sipo3izcfmav2fshrrnkvfe2me",
    "bafybeidowogbsrjtva36r5g5d7vsd5wr2qi4i2qoh5hbhrt6ywngvailey",
    "bafybeieb7pr5a7edvifgcpmm7kb3jdogxayr2nht6md3ibebhurx357lti",
    "bafybeifuju52t47sagzhli4rt5g2q63lxuwwp3qnn34nfe4q3cb7nwly6q",
    "bafybeic7szxwm6vitxotfvqpws2hix3r3otuc6irpnm6oyom2xqleattby",
    "bafybeihlhnb3f67rj5ooawor56rqbh7hjjogmqmiknnw3gvzvi22gmo75e",
    "bafybeibjapcnkpfq2eke7pqhr5ici6zqsdbf4y3y5evjw5iagm5vei2jnu",
    "bafybeib3yoxbxqfuqqy4pf6lav3mv6bqz4udlvj66hc5h5ukhhup2x2pgy",
    "bafybeiahfu32ywtms4525qvwgjkjzhkd3dox4mvitxxpdffr4a4fc5nd7m",
    "bafybeicmppri5agnyzc2kahytp4celdxew5aoiozvbx5secc2idrejbtqm",
    "bafybeid4njx3a4b2mmys5bap5vxoxnf4kmb5g5pznpe5bjjm6crwxbh54y",
    "bafybeihovuz3cp4h5qvcgygduupgwe72s5akedekkfcwxrusyjn47z7vse",
    "bafybeigubm5rmakrpwglyxafssrl5xvg32uxvfkf4tvvvwdsratfy4er7i",
    "bafybeiepcaas4lcinzxif4mbyk4lkpqjslt7llw6hipn42ytzxb2ixaza4",
    "bafybeiezanwbpqq7dlcr5kbl73brberygmqids4wmc44ef5ydyhie75pri",
    "bafybeihu2ba3kdvezs3lpgrh2bu6jbvsfeqe45y2tn3flmipdremia74pu",
    "bafybeic77qds4inle2mv4h6qhl5xdz7sjgq6x3kysqlli6mcdxrhk4l4ne",
    "bafybeifpevrh44divuncjl2jalwkgc25lbqvqlycyft2axfdkypjesbdxi",
    "bafybeifcdxdodhw6euqa57rqaupynffahsssd7wp22lgxozhrodyhzvhoi",
    "bafybeicbfoejegbj5os3t5lblwb6kczupkq3ci72hfysrggac5cwvudsci",
    "bafybeibtgunbyhvqa6tz2zeqz7j3ikhplyw3wiam2mopqv6be3vmj6zi2m",
    "bafybeihqbnvztibzal3n3rnf4etmyo23xbsyygr7utli47uwbtkqsef7oe",
    "bafybeih63msg752ql4vcsh54e4owygxjug3dn7x4ndajno32gyulftfsc4",
    "bafybeiawvj2uvvsvzg7nnihletlcw3swgz2cjtxee4wjuaagpli6ucvbpa",
  ];

  const blurred: string[] = [
    "bafybeig2i7zkhlpgswp4djgz6etnwarabvu2zbohyiuwxo72lamcmzufhm",
    "bafybeierqbdwqs3ditrzeqxvcmkneyyl7u44v66bkez26mm5efegbsuwkq",
    "bafybeiadhrwgzs55wbyb3glvhujt63wd6wb7pbkcclw6rzxztb2q7zeaeu",
    "bafybeiguvfgpy3mvvhgdwd3qgeqp2iosgbvoys4b5rlmri4iafjwfshdmy",
    "bafybeiba2u4l3mtrxxqiledf4uyi4q6rxaertwedjju6vnzgoaku7ftrqu",
    "bafybeicuecpea2fltzq226wjgzbbyktul6flyhecsm6j432mqgbss7r4ke",
    "bafybeighhrikgg23vgext5jkwojalxlk3hvnd7r634dsibvtfd36fcpyqa",
    "bafybeicdfeqwxhzy4wgbodwpcenpweaxuk4gf7dwfpidlkylzfaumal6la",
    "bafybeih7efsx6nlkppyzdkn23mr4omqfapop536pbyam5ckgt5jxewqj4i",
    "bafybeiexblgazcdbznajvysktpgiuix4lzcv2i543kh4r3zsh5vdgw2u7e",
    "bafybeiccnppymfnimccdwjgckdbrh2gysv26gp7hxxzn56uwaynpj4oysm",
    "bafybeifloy77z3jprs4bek5zu5m3uydmk4aoaptj7twt6xdjeo4ggaplpa",
    "bafybeib5f7c2kjv4aqcnsabmxiwbdy7ymls3z55vs2mpk43xhhfa4niq7e",
    "bafybeid7k2spi7ky7sngd4ovfnz2toj5xwzikr3x2xzbt7zgcrcyffo4py",
    "bafybeicdkqmtrejr64didvssg273fmp6bjabc2kgjhdau7jhndpdy7gxnm",
    "bafybeibfrsjvtaaizdrsh67x5epgy2x4ohl6xgzm3f244l4crzxwwedliu",
    "bafybeibaajkw64yg5ccsmyoomycpadssmvkwc6a5kqn7pbjckthze34xai",
    "bafybeigoyjpkzktidxsr6vw3epr2nonbjfeifao5jmsxwdgdpdcp6psuby",
    "bafybeicmoxocwmxoso267w3of7ohdxqa67chcxof6x7av76mgrsyvm7iie",
    "bafybeihdjju3gnec4gah5bptqn65kspetcamcm5yybwijcolyc7zm5c2hq",
    "bafybeidgr5u37tzvdoaf7bnfd5i5zodpanrspvt6blb6kbqvw2ahgc5fqm",
    "bafybeicmvvtrb3wdoatlbgodgm6g6nduknjf24m7ihaolopmi5tjjit3le",
    "bafybeicu337zdssstxe3mtz4ejtpf5pb5pkxiwzjr7rt5kklb2amjoiq2a",
    "bafybeiferzxbzlq55dpxksslhwqbzzw35o6fqx67uguums4x4qfdrxh3d4",
    "bafybeig7khoxhmovixofraabmuy63vbo22y3lt3z44yafpzulgtmnxfwai",
    "bafybeidndedlucupcpu5cqcm4ps5dsxumhmuk5yrqcmzf5a3xp3yw5s2le",
    "bafybeigv5wqwugolgbgzyzyhwnvqg5rlq5rbo6dq2lskbjnqpgay6eqbei",
    "bafybeih3vvpogqugynr25pt5tfhsyfbhyt2wohv5pylbwt4exrq2mgv5aq",
    "bafybeib42hcp2c7dl3vroalm4qcingex4zsoyqhwubavmcjid4rlb2t2ja",
    "bafybeigzd6gknn5d36vihs3weqtr4l3lfzek23qowahokrzrhdqtarnfk4",
    "bafybeidyvvk63y5ih3w25lfnrnugze4sghcdbqcbtif64ksfn25tgh63sy",
  ];

  return (
    <div className="min-h-72 h-72 flex relative w-full bg-offWhite cursor-empireA overflow-hidden pb-10">
      <Marquee className="flex" pauseOnHover pauseOnClick direction="right">
        {imageName.map((image: string, index: number) => {
          return (
            <div
              key={index}
              className={`min-h-60 min-w-60 h-60 w-60 relative mr-4 ${
                blur && "blur-sm animate-unblur"
              }`}
            >
              <Image
                src={`https://${imagesURI[index]}.ipfs.w3s.link/${image}.png`}
                objectFit="cover"
                layout="fill"
                priority
                placeholder="blur"
                blurDataURL={`https://${blurred[index]}.ipfs.w3s.link/${image}.png`}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Slider;
